import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL);

import initUser from './user.js';
import initActionHistory from './actionhistory.js';

const User = initUser(sequelize);
const ActionHistory = initActionHistory(sequelize);

const models = {
  User,
  ActionHistory,
};

export { sequelize, User, ActionHistory };
export default models;
