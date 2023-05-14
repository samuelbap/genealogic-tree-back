import { partnership } from '../models/partnership.js';

export const partnershipController = {
  getAllPartnerships: async (req, res) => {
    try {
      const partnerships = await partnership.findAll();
      res.json(partnerships);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getPartnershipById: async (req, res) => {
    const { id } = req.params;
    try {
      const partnership = await partnership.findByPk(id);
      if (partnership) {
        res.json(partnership);
      } else {
        res.status(404).json({ message: 'Partnership not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

