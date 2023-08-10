const {
  isValidName,
  checkFormat,
  passwordVal,
  isValidEmail,
} = require("../../validation/validation");
const bcrypt = require("bcrypt");
const userModel = require("../../model/userModel");

const signUp = async (req, res) => {
  try {
    let { name, email, location, password } = req.body;
    const user = {};

    name = checkFormat(name);
    if (!name)
      return res
        .status(400)
        .send({ status: false, message: "please check your name" });

    if (!isValidName(name))
      return res
        .status(400)
        .send({ status: false, message: "pass valid name" });

    user.name = name.toLowerCase();

    email = checkFormat(email);
    if (!email)
      return res
        .status(400)
        .send({ status: false, message: "please check your email" });


    if (!isValidEmail(email))
      return res
        .status(400)
        .send({ status: false, message: "pass valid email" });

    email = email.toLowerCase();

    
    // location validation
    location = checkFormat(location);
    if (!location)
      return res
        .status(400)
        .send({ status: false, message: "please check your location" });
        

    // password field----------------------

    password = checkFormat(password);
    if (!password)
      return res
        .status(400)
        .send({ status: false, message: "please check your password" });
    if (!passwordVal(password))
      return res.status(400).send({
        status: false,
        message:
          "pass valid password  it should contain lowercase, uppercase number specialcharacter,",
      });

    //hash user entered password
    user.password = await bcrypt.hash(password, password.length);

    // check duplicate email
    let checkEmail = await userModel.findOne({ email: email });
    console.log(checkEmail);
    if (checkEmail)
      return res
        .status(400)
        .send({ message: "this mail user already exist please login" });

    user.email = email;
    user.location = location;
    
    //create user
    let createUser = await userModel.create(user);
    return res.status(201).send({
      status: true,
      message: "registered successfully",
      data: createUser,
    });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = { signUp };
