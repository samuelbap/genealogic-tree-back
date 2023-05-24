// backend/src/controllers/fullDocumentController.js
import { document } from '../models/document.js';
import { person } from '../models/person.js';
import { documentLocation } from '../models/documentLocation.js';
import { protagonist } from '../models/protagonist.js';
import { partnership } from '../models/partnership.js';
import { childRecord } from '../models/childRecord.js';
import { partner } from '../models/partner.js';
import { sequelize } from '../config/database.js';

export const fullDocumentController = {
  createFullDocument: async (req, res) => {
    try {
      const t = await sequelize.transaction();
      
      const jsonData = req.body;
      const docLocation = await documentLocation.findOrCreate({where: jsonData.documentLocation, transaction: t});
      const rootPerson = await traversePersonTree(jsonData.rootPerson, null, null, t);

      const doc = await document.create({
        ...jsonData,
        idLocation: docLocation[0].id,
        rootPersonId: rootPerson.id
      }, { transaction: t });

      await traversePersonTree(jsonData.rootPerson, doc.id, rootPerson, t);
      const protagonistPersons = await findProtagonists(jsonData.protagonists, doc.id, t);
      
      await protagonist.bulkCreate(protagonistPersons.map((personInstance) => ({
        idDocument: doc.id,
        idPerson: personInstance.id
      })), { transaction: t });

      await t.commit();
      res.status(200).json({ message: 'Document loaded successfully' });
    } catch (error) {
      console.log(error);
      await t.rollback();
      res.status(500).json({ message: 'Error loading document' });
    }
  }
}

const traversePersonTree = async (personData, idDocument = null, rootPerson=null, transaction) => {
  const { title, name, lastName, partners } = personData;

  const personInstance = rootPerson ? rootPerson : await person.create({ 
    title: title,
    name: name,
    lastName: lastName ? lastName.join(' ') : null
  }, { transaction });

  if (idDocument && partners) {
    for (const partnerData of partners) {
      const { commonChildren } = partnerData;
      
      const partnerInstance = await traversePersonTree(partnerData, idDocument, null, transaction);
      const partnershipInstance = await partnership.create({ idDocument }, { transaction });
      
      await partner.bulkCreate([
        { idPerson: personInstance.id, idPartnership: partnershipInstance.id },
        { idPerson: partnerInstance.id, idPartnership: partnershipInstance.id }
      ], { transaction });

      if (commonChildren) {
        for (const childData of commonChildren) {
          const childInstance = await traversePersonTree(childData, idDocument, null, transaction);
          await childRecord.create({ 
            idPerson: childInstance.id,
            idPartnership: partnershipInstance.id,
            idDocument
          }, { transaction });
        }
      }
    }
  }

  return personInstance;
}

const findProtagonists = async (docProtagonists, idDocument, transaction) => {
  const protagonists = [];
  const partnershipRecords = await partnership.findAll({ where: { idDocument }, transaction });
  const partnerRecords = await partner.findAll({ 
    where: { idPartnership: partnershipRecords.map(record => record.id) }, 
    transaction
  });

  const childRecords = await childRecord.findAll({ where: { idDocument }, transaction });

  const relatedPersons = [
    ...partnerRecords.map(record => record.idPerson),
    ...childRecords.map(record => record.idPerson)
  ];

  for (const personData of docProtagonists) {
    const personInstance = await person.findOne({
      where: {
        title: personData.title,
        name: personData.name,
        lastName: personData.lastName ? personData.lastName.join(' ') : null
      },
      transaction
    });

    if (personInstance && relatedPersons.includes(personInstance.id)) {
      protagonists.push(personInstance);
    }
  }

  return protagonists;
};
