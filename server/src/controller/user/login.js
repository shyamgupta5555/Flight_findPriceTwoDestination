const { jwtToken } = require("../../jwtToken/token");
const { checkFormat, isValidEmail } = require("../../validation/validation");
const bcrypt = require("bcrypt");
const userModel = require("../../model/userModel");

const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .send({ status: false, message: "please fill all the fields" });

    // check for email or number and their validation

    if (!isValidEmail(email))
      return res
        .status(400)
        .send({ status: false, message: "incorrect email" });

    password = checkFormat(password);
    if (!password)
      return res
        .status(400)
        .send({ status: false, message: "incorrect number/email or password" });

    let userData = await userModel.findOne({ email: email });
    if (!userData)
      return res.status(404).send({
        status: false,
        message: "no user found",
      });

    else {
      const comparePassword = bcrypt.compareSync(password, userData.password);
      if (!comparePassword)
        return res.status(400).send({
          status: false,
          message: "incorrect number/email or password",
        });
    }

    // token creation
    
    const tokenObject = jwtToken(userData._id, userData.is_premium_user);
    res.cookie("token", tokenObject, {
      httpOnly: true, // Ensures the cookie is accessible only through HTTP requests
    });

    return res
      .status(200)
      .send({ status: true, message: "User login successful" ,tokenObject });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { login };
