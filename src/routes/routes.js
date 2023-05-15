import express from 'express';

import { documentController } from '../controllers/documentController.js';
import { documentLocationController } from '../controllers/documentLocationController.js';
import { personController } from '../controllers/personController.js';
import { partnershipController } from '../controllers/partnershipController.js';

export const router = express.Router();

// Document routes
router.get('/documents', documentController.getAllDocuments);
router.post('/documents', documentController.createDocument);
router.get('/documents/:id', documentController.getDocumentById);
router.put('/documents/:id', documentController.updateDocument);
router.delete('/documents/:id', documentController.deleteDocument);

// DocumentLocation routes
router.get('/document-locations', documentLocationController.getAllDocumentLocations);
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

// protagonist routes
// Add your documentPartnership routes here

// partnership routes
router.get('/partnership', partnershipController.getAllPartnerships);
router.get('/partnership/:id', partnershipController.getPartnershipById);

// children routes
// Add your children routes here
