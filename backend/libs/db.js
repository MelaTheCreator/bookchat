import { Sequelize } from "sequelize";

const DB_CONNECTION = process.env.DB_CONNECTION;

if (!DB_CONNECTION) {
  console.error("DB_CONNECTION muss zuerst eingerichtet werden!");
  process.exit(1);
}

export const db = new Sequelize(DB_CONNECTION);
