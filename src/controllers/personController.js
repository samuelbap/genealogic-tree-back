// backend/src/controllers/personController.js

import { person } from '../models/person.js';

export const personController = {
  getAllPersons: async (req, res) => {
    try {
      const persons = await person.findAll();
      res.status(200).json(persons);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createPerson: async (req, res) => {
    try {
      const newPerson = await person.create(req.body);
      res.status(201).json(newPerson);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getPersonById: async (req, res) => {
    try {
      const person = await person.findByPk(req.params.id);
      if (person) {
        res.status(200).json(person);
      } else {
        res.status(404).json({ error: 'person not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updatePerson: async (req, res) => {
    try {
      const updatedPerson = await person.update(req.body, {
        where: { id: req.params.id },
        returning: true,
        plain: true
      });
      if (updatedPerson[0]) {
        res.status(200).json(updatedPerson[1]);
      } else {
        res.status(404).json({ error: 'person not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deletePerson: async (req, res) => {
    try {
      const rowsDeleted = await person.destroy({ where: { id: req.params.id } });
      if (rowsDeleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'person not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
