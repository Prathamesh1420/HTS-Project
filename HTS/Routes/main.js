const express = require("express");
const router = express.Router();
const model = require("../Models/model");
const bcrypt = require("bcryptjs");

router.post("/signup", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    const verifyEmail = await model.findOne({ email: email });
    if (verifyEmail) {
      return res
        .status(409)
        .send("This Email Is Already Registered! Try Different Email");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userInfo = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: hashedPassword,
    };
    const data = new model(userInfo);
    await data.save();
    return res.status(201).send("User Created Successfully!");
  } catch (error) {
    return res.status(500).send(`Error: ${error.message}`);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const verify = await model.find({ email: email });
    if (verify.length === 0) {
      return res.status(404).send("No Email Found ! Try Again");
    }

    const userPass = verify[0].password;
    const comparePass = await bcrypt.compare(password, userPass);
    if (!comparePass) {
      return res.status(401).send("Wrong Password");
    }
    return res.status(200).send("Login Successfull!");
  } catch (error) {
    return res.status(500).send(`Error: ${error.message}`);
  }
});

module.exports = router;
