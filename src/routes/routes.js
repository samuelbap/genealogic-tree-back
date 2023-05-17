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
router.post('/new-document', documentController.createDocument);
router.get('/document/:id', documentController.getDocumentById);
router.put('/document/:id', documentController.updateDocument);
router.delete('/document/:id', documentController.deleteDocument);

// DocumentLocation routes
router.get('/document-locations', documentLocationController.getAllDocumentLocations);
router.post('/new-document-location', documentLocationController.createDocumentLocation);
router.get('/document-location/:id', documentLocationController.getDocumentLocationById);
router.put('/document-location/:id', documentLocationController.updateDocumentLocation);
router.delete('/document-location/:id', documentLocationController.deleteDocumentLocation);

// Person routes
router.get('/people', personController.getAllpeople);
router.post('/new-person', personController.createPerson);
router.get('/person/:id', personController.getPersonById);
router.put('/person/:id', personController.updatePerson);
router.delete('/person/:id', personController.deletePerson);

// DocumentProtagonist routes
router.get('/protagonists', protagonistController.getAllProtagonists);
router.post('/new-protagonist', protagonistController.createProtagonist);
router.get('/protagonist/:id', protagonistController.getProtagonistById);
router.put('/protagonist/:id', protagonistController.updateProtagonist);
router.delete('/protagonist/:id', protagonistController.deleteProtagonist);

// Partnership routes
router.get('/partnerships', partnershipController.getAllPartnerships);
router.get('/partnership/:id', partnershipController.getPartnershipById);
router.post('/new-partnership', partnershipController.createPartnership);
router.put('/partnership/:id', partnershipController.updatePartnership);
router.delete('/partnership/:id', partnershipController.deletePartnership);

// Children routes
router.get('/children', childrenController.getAllChildren);
router.post('/new-child', childrenController.createChild);
router.get('/child/:id', childrenController.getChildById);
router.put('/child/:id', childrenController.updateChild);
router.delete('/child/:id', childrenController.deleteChild);
