import express from 'express';

import { documentController } from '../controllers/documentController.js';
import { documentLocationController } from '../controllers/documentLocationController.js';

import { personController } from '../controllers/personController.js';

import { partnershipController } from '../controllers/partnershipController.js';
import { protagonistController } from '../controllers/protagonistController.js';
import { childrenController } from '../controllers/childrenController.js';

export const router = express.Router();

// Document routes
router.get('/documents', documentController.getAllDocuments);
router.post('/documents', documentController.createDocument);
router.get('/documents/:id', documentController.getDocumentById);
router.put('/documents/:id', documentController.updateDocument);
router.delete('/documents/:id', documentController.deleteDocument);

// DocumentLocation routes
router.get('/document-locations',  documentLocationController.getAllDocumentLocations);
router.post('/document-locations', documentLocationController.createDocumentLocation);
router.get('/document-locations/:id', documentLocationController.getDocumentLocationById);
router.put('/document-locations/:id', documentLocationController.updateDocumentLocation);
router.delete('/document-locations/:id', documentLocationController.deleteDocumentLocation);

// Person routes
router.get('/persons', personController.getAllPersons);
router.post('/persons', personController.createPerson);
router.get('/persons/:id', personController.getPersonById);
router.put('/persons/:id', personController.updatePerson);
router.delete('/persons/:id', personController.deletePerson);

// DocumentProtagonist routes
router.get("/protagonists", protagonistController.getAllProtagonists);
router.post("/protagonists", protagonistController.createProtagonist);
router.put("/protagonists/:id", protagonistController.updateProtagonist);
router.delete("/protagonists/:id", protagonistController.deleteProtagonist);

// Partnership routes
router.get("/partnerships", partnershipController.getAllPartnerships);
router.get("/partnerships/:id", partnershipController.getPartnershipById);
router.post("/partnerships", partnershipController.createPartnership);
router.put("/partnerships/:id", partnershipController.updatePartnership);
router.delete("/partnerships/:id", partnershipController.deletePartnership);


// Children routes
router.get("/children", childrenController.getAllChildren);
router.post("/children", childrenController.createChildren);
router.put("/children/:id", childrenController.updateChildren);
router.delete("/children/:id", childrenController.deleteChildren);

