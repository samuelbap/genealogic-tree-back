// backend/src/controllers/documentLocationController.js

import { documentLocation } from '../models/documentLocation.js';

export const documentLocationController = {
  getAllDocumentLocations: async (req, res) => {
    try {
      const documentLocations = await documentLocation.findAll();
      res.status(200).json(documentLocations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createDocumentLocation: async (req, res) => {
    try {
      const newDocumentLocation = await documentLocation.create(req.body);
      res.status(201).json(newDocumentLocation);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getDocumentLocationById: async (req, res) => {
    try {
      const getdocumentLocation = await documentLocation.findByPk(req.params.id);
      if (getdocumentLocation) {
        res.status(200).json(getdocumentLocation);
      } else {
        res.status(404).json({ error: 'documentLocation not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  updateDocumentLocation: async (req, res) => {
    try {
      const updatedDocumentLocation = await documentLocation.update(req.body, {
        where: { id: req.params.id },
        returning: true,
        plain: true
      });
      if (updatedDocumentLocation[0]) {
        res.status(200).json(updatedDocumentLocation[1]);
      } else {
        res.status(404).json({ error: 'documentLocation not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  deleteDocumentLocation: async (req, res) => {
    try {
      const rowsDeleted = await documentLocation.destroy({ where: { id: req.params.id } });
      if (rowsDeleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'documentLocation not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
