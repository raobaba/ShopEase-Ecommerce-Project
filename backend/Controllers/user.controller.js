const { UserModel } = require("../Models/user.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
    const { fullName, userName, email, password } = req.body;

    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                console.log(err);
            } else {
                const user = new UserModel({ fullName, userName, email, password: hash });
                await user.save();
                res.send("Registered");
            }
        });
    } catch (err) {
        res.send("Error in registering the user");
        console.log(err);
    }
};

  
  module.exports = {
    registerUser
  };
