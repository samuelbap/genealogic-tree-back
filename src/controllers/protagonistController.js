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
      const getprotagonist = await protagonist.findByPk(req.params.id);
      res.status(200).json(getprotagonist);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  createProtagonist: async (req, res) => {
    try {
      const newProtagonist = await protagonist.create(req.body);
      res.status(201).json(newProtagonist);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  updateProtagonist: async (req, res) => {
    try {
      const updateProtagonist = await protagonist.update(req.body, {
        where: { id: req.params.id }
      });
      if (updateProtagonist[0]) {
        res.status(200).json(updateProtagonist[1]);
      } else {
        res.status(404).json({ error: 'protagonist not found' });
      }
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
