import { children } from '../models/children.js';

export const childrenController = {
  getAllChildren: async (req, res) => {
    try {
      const children = await children.findAll();
      res.json(children);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  // Get Children by id
  getChildById: async (req, res) => {
    try {
      const getchildren = await children.findByPk(req.params.id);
      res.status(200).json(getchildren);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  // Create Children
  createChild: async (req, res) => {
    try {
      const newchildren = await children.create(req.body);
      res.status(201).json(newchildren);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Update a children
  async updateChild(req, res) {
    try {
      const updateChild = await children.update(req.body, {
        where: { id: req.params.id }
      });
      if (updateChild[0]) {
        res.status(200).json(updateChild[1]);
      } else {
        res.status(404).json({ error: 'childrengit not found' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Delete a Children
  async deleteChild(req, res) {
    try {
      await children.destroy({
        where: { id: req.params.id }
      });
      res.status(200).json({ message: 'Children deleted successfully.' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};
