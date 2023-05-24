// backend/src/controllers/fullDocumentController.js

import { document } from '../models/document.js';
import { person } from '../models/person.js';
import { documentLocation } from '../models/documentLocation.js';
import { protagonist } from '../models/protagonist.js';
import { partnership } from '../models/partnership.js';
import { childRecord } from '../models/childRecord.js';
import { partners } from '../models/partners.js';

export const fullDocumentController = {

  createFullDocument: async (req, res) => {
    try {
      // Parse the JSON data
      const jsonData = req.body;

      // Insert the document location
      const docLocation = await documentLocation.create(jsonData.documentLocation);

      // Traverse the person tree and insert into the database
      const rootPerson = await traversePersonTree(jsonData.rootPerson);

      // Insert the document itself
      const doc = await document.create({
        ...jsonData,
        idLocation: docLocation.id,
        rootPersonId: rootPerson.id
      });

      await traversePersonTree(jsonData.rootPerson, doc.id, rootPerson);

      // Loop over the protagonists array and create protagonists
      const protagonistPersons = await findProtagonists(jsonData.protagonists, doc.id);
      for (const protagonistPerson of protagonistPersons) {
        await protagonist.create({
          idDocument: doc.id,
          idPerson: protagonistPerson.id
        });
      }

      res.status(200).json({ message: 'Document loaded successfully' });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error loading document' });
    }
  }

}
const traversePersonTree = async (personData, idDocument = null, rootPerson=null) => {
  let { title, name, lastName, partner} = personData;

  lastName = lastName ? lastName.join(' ') : null;

  // Insert the person
  // const personInstance = await person.findOrCreate({
  const personInstance = (
    rootPerson ?
      rootPerson :
        await person.create({ 
          title: title,
          name: name,
          lastName: lastName
        })
  )

  // console.log({ title, name, lastName, partner}, personInstance)

  if (! idDocument) {
    return personInstance
  }
  // Loop over partnerships and create those, with children

  if (partner) {
    for (const partnerData of partner) {
      const { commonChildren } = partnerData;
      
      // Create partner instance
      const partnerInstance = await traversePersonTree(partnerData, idDocument);

      // Create partnership
      const partnershipInstance = await partnership.create({ idDocument: idDocument });
      
      await partners.bulkCreate([
        { idPerson: personInstance.id, idPartnership: partnershipInstance.id },
        { idPerson: partnerInstance.id, idPartnership: partnershipInstance.id }
      ]);

      // Create child records
      if (commonChildren) {
        for (const childData of commonChildren) {
          const childInstance = await traversePersonTree(childData, idDocument);
          await childRecord.create({ 
            idPerson: childInstance.id,
            idPartnership: partnershipInstance.id,
            idDocument: idDocument
          });
        }
      }
    }
  }

  return personInstance;
}

const findProtagonists = async (docProtagonists, idDocument) => {

  // Placeholder for protagonist Persons
  let protagonists = [];

  // Search through the partnership and child records for protagonists
  const partnershipRecords = await partnership.findAll({ where: { idDocument: idDocument }});

  let allPartners = [];

  // For each partnership, get all associated partners
  for (const partnershipInstance of partnershipRecords) {
    const partnersInPartnership = await partners.findAll({ where: { idPartnership: partnershipInstance.id }});
    
    // For each partner record, get the actual person and add to the list
    for (const partnerRecord of partnersInPartnership) {
      // console.log(partnerRecord)
      allPartners.push(partnerRecord);
    }
  }

  const childRecords = (await childRecord.findAll({ where: { idDocument: idDocument }})).map(record => record.idPerson) ;

  allPartners = allPartners.map(record => record.idPerson);

  const relatedPersons = [...allPartners, ...childRecords];

  // Check if each person in the protagonist array is related to the document
  for (const personData of docProtagonists) {
    const personInstance = await person.findOne({
      where: {
        title: personData.title,
        name: personData.name,
        lastName: personData.lastName ? personData.lastName.join(' ') : null
      }
    });
    if (personInstance && relatedPersons.includes(personInstance.id)) {
      protagonists.push(personInstance);
    }
  }

  return protagonists;
};
