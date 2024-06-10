import { Sequelize, Model, DataTypes } from 'sequelize';

export const sequelize: Sequelize;
export class User extends Model {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
}

export class ActionHistory extends Model {
  public id!: number;
  public userId!: number;
  public action!: string;
  public timestamp!: Date;
}