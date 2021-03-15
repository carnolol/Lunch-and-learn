require("dotenv").config();
const massive = require("massive");
const express = require("express");
const session = require("express-session");
const app = express();
app.use(express.json());
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const userController = require("./userController.js");

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false
  }
}).then((db) => {
  app.set("db", db);
  console.log("The Database is Online");
  app.listen(SERVER_PORT, () => console.log(`Docked at port ${SERVER_PORT}`));
});

// Library to store our session / cookie
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 }, //* setting cookie time for one month
    secret: SESSION_SECRET
  })
);

//* Creating our user Endpoints
