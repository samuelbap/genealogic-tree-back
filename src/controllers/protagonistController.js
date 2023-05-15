import { protagonist } from '../models/protagonist.js';

export const protagonistController = {
  getAllProtagonists: async (req, res) => {
    try {
      const protagonists = await protagonist.findAll();
      res.json(protagonists);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getProtagonistById: async (req, res) => {
    try {
      const protagonist = await protagonist.findByPk(req.params.id);
      res.status(200).json(protagonist);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  createProtagonist: async (req, res) => {
    try {
      const protagonist = await protagonist.create(req.body);
      res.status(201).json(Protagonist);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  updateProtagonist: async (req, res) => {
    try {
      await protagonist.update(req.body, {
        where: { id: req.params.id }
      });
      res.status(200).json({ message: 'Protagonist updated successfully.' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  deleteProtagonist: async (req, res) => {
    try {
      await protagonist.destroy({
        where: { id: req.params.id }
      });
      res.status(200).json({ message: 'Protagonist deleted successfully.' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

// Otros métodos del controlador para crear, actualizar y eliminar protagonistas...
