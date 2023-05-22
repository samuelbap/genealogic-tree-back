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
router.post('/documents/new', documentController.createDocument);
router.get('/documents/:id', documentController.getDocumentById);
router.put('/documents/:id', documentController.updateDocument);
router.delete('/documents/:id', documentController.deleteDocument);
router.get('/documents/get-full', documentController.getFullDocument);
router.post('/documents/new-full', documentController.createFullDocument);

// DocumentLocation routes
router.get('/document-locations', documentLocationController.getAllDocumentLocations);
router.post('/document-locations/new', documentLocationController.createDocumentLocation);
router.get('/document-locations/:id', documentLocationController.getDocumentLocationById);
router.put('/document-locations/:id', documentLocationController.updateDocumentLocation);
router.delete('/document-locations/:id', documentLocationController.deleteDocumentLocation);

// Person routes
router.get('/people', personController.getAllpeople);
router.post('/people/new', personController.createPerson);
router.get('/people/:id', personController.getPersonById);
router.put('/people/:id', personController.updatePerson);
router.delete('/people/:id', personController.deletePerson);

// DocumentProtagonist routes
router.get('/protagonists', protagonistController.getAllProtagonists);
router.post('protagonists/new', protagonistController.createProtagonist);
router.get('/protagonists/:id', protagonistController.getProtagonistById);
router.put('/protagonists/:id', protagonistController.updateProtagonist);
router.delete('/protagonists/:id', protagonistController.deleteProtagonist);

// Partnership routes
router.get('/partnerships', partnershipController.getAllPartnerships);
router.get('/partnerships/:id', partnershipController.getPartnershipById);
router.post('/partnerships/new', partnershipController.createPartnership);
router.put('/partnerships/:id', partnershipController.updatePartnership);
router.delete('/partnerships/:id', partnershipController.deletePartnership);

// Children routes
router.get('/children', childrenController.getAllChildren);
router.post('/children/new', childrenController.createChild);
router.get('/children/:id', childrenController.getChildById);
router.put('/children/:id', childrenController.updateChild);
router.delete('/children/:id', childrenController.deleteChild);
