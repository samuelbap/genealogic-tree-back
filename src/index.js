import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { router } from './routes/routes.js';

import { sequelize } from './config/database.js';

import { person } from './models/person.js';
import { partner } from './models/partner.js';
import { partnership } from './models/partnership.js';
import { childRecord } from './models/childRecord.js';
import { document } from './models/document.js';
import { documentLocation } from './models/documentLocation.js';
import { protagonist } from './models/protagonist.js';

const app = express();

dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Status
app.get('/health', (_, res) => {
  res.status(200).json({
    env: process.env.NODE_ENV,
    message: 'Is running'
  });
});

app.get(
  '/samuel',
  (req, res, next) => {
    console.log(req);
    console.log(
      '------------------------------------------------------------------------------------------------------------'
    );
    console.log(
      '------------------------------------------------------------------------------------------------------------'
    );
    console.log(
      '------------------------------------------------------------------------------------------------------------'
    );
    console.log(
      '------------------------------------------------------------------------------------------------------------'
    );
    req.ruben = {};
    next();
  },
  (req, res, next) => {
    const params = req.params;
    if (params) {
      req.ruben.params = 'He encontrado parametros';
    }
    next();
  },
  (req, res, next) => {
    req.ruben.saludo = 'Hola que tal estas?';
    next();
  },
  (req, res, next) => {
    req.ruben.edad = 32;
    console.log(req);
    res.json(req.ruben);
  }
);

// Routes
app.use('/api', router);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const models = {
  person,
  partnership,
  partner,
  childRecord,
  document,
  documentLocation,
  protagonist
}
Object.values(models)
  .filter(model => typeof model.associate === "function")
  .forEach(model => {
    // console.log(model.associate.toString()+'\n');
    model.associate(models)
  });
// person.associate(models)

// Start idex

/*
 *   User.sync() - This creates the table if it doesn't exist (and does nothing if it already exists)
 *    User.sync({ force: true }) - This creates the table, dropping it first if it already existed
 *    User.sync({ alter: true }) - This checks what is the current state of the table in the database
 */

const PORT = process.env.PORT || 3001;
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    await sequelize.sync({ force: true });
    console.log('All models were synchronized successfully.');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
