import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  }
);

/*
*   const sequelize = new Sequelize('nombre_de_la_base_de_datos', 'usuario', 'contraseña', {
     host: 'localhost',
     port: 5432,
     dialect: 'postgres',
   });
   ```
*/
