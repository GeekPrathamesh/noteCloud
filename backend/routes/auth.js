const express = require("express");
const User = require("../models/User.js");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/logindetails.js");

const JWT_secret = "haryyisgoodteacher";

// creating new user with no log in req

router.post(
  "/createuser",
  [
    body("email", "enter valid email").isEmail(),
    body("name", "enter valid name of min 3 chars").isLength({ min: 3 }),
    body("password", "enter min 4 char pass").isLength({ min: 4 }),
  ],
  async (req, res) => {
    //if errors in input data return bad request and errors
    let success;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false;
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      //check first that user with email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "user with that email already exists" });
      }

      //salt is generated
      const salt = await bcrypt.genSalt(10);

      const secPass = await bcrypt.hash(req.body.password, salt);

      //creating neww user at database
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      // res.json(user);

      const obj = { user: { id: user.id } };
      var token = jwt.sign(obj, JWT_secret);
      success = true;
      res.json({ success, token });
    } catch (error) {
      success = false;
      console.error(error.message);
      res.status(500).send("some error occur at route 1", success);
    }
  }
);
//route 2
// login new user with no log in req

router.post(
  "/login",
  [
    body("email", "enter valid email").isEmail(),
    body("password", "not be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //trying to find whether user exists

    const { email, password } = req.body;
    try {
      let success;
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "enter correct user credentials" });
      }

      //verifying the password

      const passMatch = await bcrypt.compare(password, user.password);
      if (!passMatch) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "enter valid password credentials" });
      }

      const obj = {
        user: {
          id: user.id,
        },
      };

      //assgning auth token
      var token = jwt.sign(obj, JWT_secret);
      success = true;

      res.json({ success, token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occur at route 2");
    }
  }
);

//route 3
//get loged in user all details // login required

router.post("/logindetails", fetchuser, async (req, res) => {
  try {
    const userID = req.user.id;
    const user = await User.findById(userID).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occur at route 3");
  }
});

module.exports = router;
