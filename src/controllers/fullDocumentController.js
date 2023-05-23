// backend/src/controllers/fullDocumentController.js
import { Op } from 'sequelize';
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

import { document } from '../models/document.js';
import { documentLocation } from '../models/documentLocation.js';
import { partnership } from '../models/partnership.js';
import { person } from '../models/person.js';
import { childRecord } from '../models/childRecord.js';
import { protagonist } from '../models/protagonist.js';

// Helper function to fetch a person tree recursively
async function fetchPersonTree(personId,idDocument) {
  const _person = await person.findByPk(personId);
  const partnerships = await partnership.findAll({
    where: {
      [Op.and]: [
        {
          [Op.or]: [
            { partner1: personId },
            { partner2: personId },
          ]
        },
        {
          document: idDocument
        }
      ]
    }
  });

  const idPartners = partnerships.map((p) => p.partner1);
  const partners = [];
  for (let idPartner of idPartners) {
    const partner = await fetchPersonTree(idPartner,idDocument);
    partners.push(partner);
  }

  const childrenIds = partnerships.map((p) => p.idPartnership);
  const _children = [];
  for (let childId of childrenIds) {
    const child = await fetchPersonTree(childId,idDocument);
    _children.push(child);
  }

  return {
    ..._person.toJSON(),
    partners,
    commonChildren: _children,
  };
};

// Helper function to create a person tree recursively
async function createPersonTree(personTree, idDocument = null, idPartner = null) {
  const _person = await person.findOrCreate({
    where: {
      title: personTree.title,
      name: personTree.name,
      lastName: ( personTree.lastName ? personTree.lastName.join(' ') : null )
    }
  });

  console.log("Person created",personTree)

  if (idDocument) {

    if (personTree.partner) {
      for (let partner of personTree.partner) {
        const partnerPerson = await createPersonTree(partner, idDocument, idPartner=_person.id);
        await partnership.findOrCreate({
          where: {
            idDocument: idDocument,
            partner1: _person.id,
            partner2: partnerPerson.id,
          }
        });
      }
    }
  }

  if (idPartner && idDocument) {
    const parentsPartnership = await partnership.findOrCreate({
      // where: {
      //   [Op.and]: [
      //     {
      //       [Op.or]: [
      //         { partner1: _person.id,
      //           partner2: idPartner
      //         },
      //         { partner1: idPartner,
      //           partner2: _person.id
      //         }
      //       ]
      //     },
      //     {
      //       document: idDocument
      //     }
      //   ]
      // }
      where: {
        idDocument: idDocument,
        partner1: idPartner,
        partner2: _person.id
      }
    });

    if (personTree.commonChildren) {
      for (let child of personTree.commonChildren) {
        const childPerson = await createPersonTree(child, idDocument);
        await childRecord.create({
          document: idDocument,
          child: childPerson.id,
          partnership: parentsPartnership,
        });      
      }
    }

  }

  return _person;
};

export const fullDocumentController = {

  getFullDocument:  async (req, res) => {
    try {
      const idDocument = req.params.id;
      const document = await Document.findByPk(idDocument);

      if (!document) {
        return res.status(404).send({ message: "Document Not found." });
      }

      const location = await documentLocation.findByPk(document.locationId);
      const rootPersonTree = await fetchPersonTree(document.rootPersonId, idDocument);
      const documentProtagonists = await documentProtagonist.findAll({
        where: { idDocument: idDocument },
      });

      const protagonists = [];
      for (let dp of documentProtagonists) {
        const person = await person.findByPk(dp.idPerson);
        protagonists.push(person);
      }

      const fullDocument = {
        ...document.toJSON(),
        documentLocation: location,
        rootPerson: rootPersonTree,
        protagonist: protagonists,
      };

      res.send(fullDocument);
    } catch (error) {
      res.status(500).send({
        message: "Error retrieving document with id=" + id,
        error: error.message,
      });
    }
  },

  createFullDocument: async (req, res) => {
    const documentData = req.body;
    const t = await sequelize.transaction();
    try {
      // console.log(documentData);
      const location = await documentLocation.create(documentData.documentLocation);
  
      const rootPerson = await createPersonTree(documentData.rootPerson);
  
      const _document = await document.create(
        {
          documentType: documentData.documentType,
          eventLocation: documentData.eventLocation,
          issueDate: documentData.issueDate,
          imageNumber: documentData.imageNumber,
          imageUrl: documentData.imageUrl,
          locationId: location.id,
          rootPersonId: rootPerson.id,
        },
      );
  
      const personTree = await createPersonTree(documentData.rootPerson,_document.id);

      for (const _protagonist of documentData.protagonist) {
  
        const _person = await person.findOne({
          where: {
            title : _protagonist.title ,
            name: _protagonist.name,
            lastName: ( personTree.lastName ? personTree.lastName.join(' ') : null )
          },
        });
  
        if (_person) {
          const partnerships = await partnership.findAll({
            where: {
              [Op.and]: [
                {
                  [Op.or]: [
                    { partner1: _person.id },
                    { partner2: _person.id },
                  ]
                },
                {
                  document: _document.id
                }
              ]
            }
          });
          
          await protagonist.create(
            {
              idPerson: _person.id,
              idDocument: _document.id,
            },
          );
        }
      }
  
      await t.commit();
  
      res.status(201).send({
        message: "Document and related data were created successfully.",
        idDocument: _document.id,
      });
    } catch (error) {
      await t.rollback();
      res.status(500).send(error.message)
      // res.status(500).send({
      //   message: "Failed to create document and related data.",
      //   error: error.message,
      // });
    }
  }
}