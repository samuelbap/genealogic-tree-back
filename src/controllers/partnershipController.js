// backend/src/controllers/partnershipController.js
import { partnership } from '../models/partnership.js';
import { person } from '../models/person.js';
import { partners } from '../models/partners.js';
import { childRecord } from '../models/childRecord.js';

export const partnershipController = {
  getAllPartnerships: async (req, res) => {
    try {
      const partnerships = await partnership.findAll({
        include: [
          {
            model: person,
            through: partners,
            as: 'partners'
          },
          {
            model: person,
            through: childRecord,
            as: 'children'
          }
        ]
      });
      if (partnerships.length) {
        res.status(200).json({
          data: partnerships
        });
      } else {
        res.status(404).json({
          message: 'not found partnerships'
        });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createPartnership: async (req, res) => {
    const { partners } = req.body;
    if (!partners || partners.length !== 2) {
      return res.status(400).json({ error: 'A partnership must have exactly two partners' });
    }
    try {
      const newPartnership = await partnership.create(req.body);
      res.status(201).json(newPartnership);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getPartnershipById: async (req, res) => {
    try {
      const getPartnership = await partnership.findByPk(req.params.id, {
        include: [
          {
            model: person,
            through: partners,
            as: 'partners'
          },
          {
            model: person,
            through: childRecord,
            as: 'children'
          }
        ]
      });
      if (getPartnership) {
        res.status(200).json(getPartnership);
      } else {
        res.status(404).json({ error: 'partnership not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updatePartnership: async (req, res) => {
    const { partners } = req.body;
    if (partners && partners.length !== 2) {
      return res.status(400).json({ error: 'A partnership must have exactly two partners' });
    }
    try {
      const updatedPartnership = await partnership.update(req.body, {
        where: { id: req.params.id },
        returning: true,
        plain: true
      });
      if (updatedPartnership[0]) {
        res.status(200).json(updatedPartnership[1]);
      } else {
        res.status(404).json({ error: 'partnership not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deletePartnership: async (req, res) => {
    try {
      const rowsDeleted = await partnership.destroy({ where: { id: req.params.id } });
      if (rowsDeleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'partnership not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
