import { partnership } from '../models/partnership.js';

export const partnershipController = {
  getAllPartnerships: async (req, res) => {
    try {
      const partnerships = await partnership.findAll();
      res.json({
        data: partnerships
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create a Partnership
  async createPartnership(req, res) {
    try {
      const partnership = await partnership.create(req.body);
      res.status(201).json(partnership);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Get DocumentPartnership by id
  getPartnershipById: async (req, res) => {
    try {
      const partnership = await partnership.findByPk(req.params.id);
      res.status(200).json(partnership);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Update a DocumentPartnership
  updatePartnership: async (req, res) => {
    try {
      await partnership.update(req.body, {
        where: { id: req.params.id }
      });
      res.status(200).json({ message: 'Partnership updated successfully.' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Delete a DocumentPartnership
  deletePartnership: async (req, res) => {
    try {
      await partnership.destroy({
        where: { id: req.params.id }
      });
      res.status(200).json({ message: 'partnership deleted successfully.' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};
