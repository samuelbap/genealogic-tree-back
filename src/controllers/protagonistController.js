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
    const { id } = req.params;
    try {
      const protagonist = await protagonist.findByPk(id);
      if (protagonist) {
        res.json(protagonist);
      } else {
        res.status(404).json({ message: 'Protagonist not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    }
};

