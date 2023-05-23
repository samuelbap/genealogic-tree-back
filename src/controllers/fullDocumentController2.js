// controllers/documentController.js

import { document } from '../models/document.js';
import { person } from '../models/person.js';
import { documentLocation } from '../models/documentLocation.js';
import { protagonist } from '../models/protagonist.js';
import { partnership } from '../models/partnership.js';
import { childRecord } from '../models/childRecord.js';
import { partners } from '../models/partners.js';

export const loadDocument = async (req, res) => {
  try {
    // Parse the JSON data
    const jsonData = JSON.parse(req.body.data);

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

    // Loop over the protagonists array and create protagonists
    const protagonistPersons = await findProtagonists(jsonData.rootPerson, doc.id);
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

const traversePersonTree = async (personData) => {
  // Insert the person
  const personResult = await person.create(personData);

  // Loop over partnerships and create those, with children
  for (const partnershipData of personData.partnerships) {
    const partner = await person.create(partnershipData.partner);
    const partnershipResult = await partnership.create();

    await partners.bulkCreate([
      { personId: personResult.id, partnershipId: partnershipResult.id },
      { personId: partner.id, partnershipId: partnershipResult.id }
    ]);

    for (const childData of partnershipData.children) {
      const child = await person.create(childData);
      await childRecord.create({
        idChild: child.id,
        idDocument: partnershipResult.id,
        idPartnership: partnershipResult.id
      });
    }
  }

  return personResult;
}

const findProtagonists = async (rootPersonData, documentId) => {
  // Placeholder for protagonist Persons
  let protagonists = [];

  // Search through the partnerships for protagonists
  for (const partnershipData of rootPersonData.partnerships) {
    const partnerPerson = await person.findOne({ where: { name: partnershipData.partner.name, lastName: partnershipData.partner.lastName }});
    const partnershipRecord = await partnership.findOne({ where: { id: partnerPerson.id }});
    const childRecords = await childRecord.findAll({ where: { idPartnership: partnershipRecord.id }});

    for (const childRecord of childRecords) {
      if (childRecord.idDocument === documentId) {
        protagonists.push(partnerPerson);
      }
    }
  }

  // Search through children for protagonists
  for (const childData of rootPersonData.children) {
    const childPerson = await person.findOne({ where: { name: childData.name, lastName: childData.lastName }});
    const childRecord = await childRecord.findOne({ where: { idChild: childPerson.id }});

    if (childRecord && childRecord.idDocument === documentId) {
        protagonists.push(childPerson);
      }
    }
  
    return protagonists;
  }