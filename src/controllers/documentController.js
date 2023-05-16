// backend/src/controllers/documentController.js
import { document } from '../models/document.js';
import { documentLocation } from '../models/documentLocation.js';
import { person } from '../models/person.js';

export const documentController = {
  getAllDocuments: async (req, res) => {
    console.log(res);

    try {
      const documents = await document.findAll({
        include: [
          {
            model: documentLocation,
            as: 'location'
          },
          {
            model: person,
            as: 'rootPerson'
          }
        ]
      });
      if (documents.length) {
        res.status(200).json({
          data: documents
        });
      } else {
        res.status(404).json({
          message: 'not found documents'
        });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createDocument: async (req, res) => {
    console.log(req.body);
    try {
      const newDocument = await document.create(req.body);
      res.status(201).json(newDocument);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getDocumentById: async (req, res) => {
    try {
      const document = await document.findByPk(req.params.id, {
        include: [
          {
            model: documentLocation,
            as: 'location'
          },
          {
            model: person,
            as: 'rootPerson'
          }
        ]
      });
      if (document) {
        res.status(200).json(document);
      } else {
        res.status(404).json({ error: 'document not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateDocument: async (req, res) => {
    try {
      const updatedDocument = await document.update(req.body, {
        where: { id: req.params.id },
        returning: true,
        plain: true
      });
      if (updatedDocument[0]) {
        res.status(200).json(updatedDocument[1]);
      } else {
        res.status(404).json({ error: 'document not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteDocument: async (req, res) => {
    try {
      const rowsDeleted = await document.destroy({ where: { id: req.params.id } });
      if (rowsDeleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'document not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

// module.exports = { documentController };
