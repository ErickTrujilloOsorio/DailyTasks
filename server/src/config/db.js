import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: './src/.env' });

const cert = path.resolve('./src/config/cert.pem');
const sslCert = fs. readFileSync(cert, 'utf8');

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: console.log,
        dialectOptions: {
            ssl: {
                require: true,
                ca: sslCert ? sslCert : undefined,
            }
        }
    }
);

export default sequelize;