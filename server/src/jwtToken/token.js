const jwt = require("jsonwebtoken");

function jwtToken(id) {
  try {
    const token = jwt.sign(
      { id: id.toString()},
      process.env.JWT_ACCESS_KEY
    );
    return { token };
  } catch (error) {
    console.log(error);
  }
}

module.exports = { jwtToken };