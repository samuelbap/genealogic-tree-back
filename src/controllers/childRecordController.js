import { childRecord } from '../models/childRecord.js';

export const childRecordController = {
  getAllchildRecord: async (req, res) => {
    try {
      const childRecords = await childRecord.findAll();
      if (childRecords.length) {
        res.status(200).json({
          data: childRecords
        });
      } else {
        res.status(404).json({
          message: 'children not found'
        });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getChildById: async (req, res) => {
    try {
      const getchildRecord = await childRecord.findByPk(req.params.id);
      res.status(200).json(getchildRecord);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  createChild: async (req, res) => {
    try {
      const newchildRecord = await childRecord.create(req.body);
      res.status(201).json(newchildRecord);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async updateChild(req, res) {
    try {
      const updateChild = await childRecord.update(req.body, {
        where: { id: req.params.id }
      });
      if (updateChild[0]) {
        res.status(200).json(updateChild[1]);
      } else {
        res.status(404).json({ error: 'childRecord not found' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Delete a childRecord
  async deleteChild(req, res) {
    try {
      await childRecord.destroy({
        where: { id: req.params.id }
      });
      res.status(200).json({ message: 'childRecord deleted successfully.' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};
