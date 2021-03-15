const bcrypt = require("bcryptjs");

module.exports = {
  login: async (req, res) => {
    const db = req.app.get("db");
    const { name, password } = req.body; // get the name & password from the input fields in the front end
    const existingUser = await db.check_if_user([name]);
    // check to see if there is already a user with that same name
    if (!existingUser[0]) {
      return res.status(404).send("Please Register before you can login");
    }

    const authenticated = bcrypt.compareSync(
      password,
      existingUser[0].password
    ); //checks password that was typed against the hashed password in the DB

    if (authenticated) {
      delete existingUser[0].password; // delete the password
      req.session.user = existingUser[0]; // put our authenticated user on our session
      res.status(200).send(req.session.user);
    } else {
      res.status(403).send("Username or Password is incorrect");
    }
  },
  register: async (req, res) => {
    const db = req.app.get("db");
    const { name, password } = req.body;
    const existingUser = await db.check_if_user([name]);

    if (existingUser[0]) {
      return res.status(409).send("This name is taken! Please Login.");
    }

    // const salt = bcrypt.genSaltSync(10); // built in function in bcrypt that tells us how strong we want our hashing to be.
    // const hash = bcrypt.hashSync(password, salt); // takes in the users password and the salt we created so it can create a hashed password
    const profile_pic = `https://robohash.org/${name}`; //profile pic will display when user is logged in
    const newUser = await db.register_user([name, password, profile_pic]); //new hashed password into our DB

    req.session.user = newUser[0]; // put new registered user on our session
    res.status(200).send(req.session.user); // Everything is all good and send it.
  },
  getLoggedInUser: async (req, res) => {
    if (req.session.user) {
      return res.status(200).send(req.session.user);
    } else {
      res.sendStatus(409);
    }
  },
  logout: async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  }
};
