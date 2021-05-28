import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  String(process.env.DB_NAME),
  String(process.env.DB_USER),
  String(process.env.DB_PASS),
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: "mariadb",
    timezone: "Asia/Bangkok",
    define: {
      freezeTableName: true,
      paranoid: true,
    },
    pool: {
      max: 20,
      idle: 10000,
      acquire: 30000,
    },
    // dialectOptions: {
    //   encrypt: false,
    // },
    logging: false,
  }
);
