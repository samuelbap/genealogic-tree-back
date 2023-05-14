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

getChildById: async (req, res) => {
  const { id } = req.params;
  try {
    const child = await children.findByPk(id);
    if (child) {
      res.json(child);
    } else {
      res.status(404).json({ message: 'Child not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
 }
};


