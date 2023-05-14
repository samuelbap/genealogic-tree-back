// backend/src/models/index.js

import { sequelize } from '../config/database.js';

import { document } from './document.js';
import { documentLocation } from './documentLocation.js';
import { person } from './person.js';
// const DocumentProtagonistModel = require('./documentProtagonist');
// const DocumentPartnershipModel = require('./documentPartnership');
// const DocumentChildrenModel = require('./documentChildren');

export const models = {
  document: document,
  documentLocation: documentLocation,
  person: person
  // DocumentProtagonist: DocumentProtagonistModel.init(sequelize, Model),
  // DocumentPartnership: DocumentPartnershipModel.init(sequelize, Model),
  // DocumentChildren: DocumentChildrenModel.init(sequelize, Model),
};

// Export models and Sequelize instance
// module.exports = {
//   ...models,
//   sequelize
// };
