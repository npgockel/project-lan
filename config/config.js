require("dotenv").config();

module.export = {
  "development": {
    "username": process.env.username,
    "password": process.env.password,
    "database": process.env.database,
    "host": process.env.host,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "project_2_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": null,
    "password": null,
    "database": null,
    "host": null,
    "dialect": "mysql"
  }
}

