require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: null,
    database: "project_2_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: null,
    password: null,
    database: null,
    host: null,
    dialect: "mysql",
  },
};
