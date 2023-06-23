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

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userID: user._id }, process.env.key);
                    res.send({ "msg": "Login Successful", "token": token });
                } else {
                    res.send("Wrong Credentials");
                }
            });
        } else {
            res.send("Wrong Credentials");
        }
    } catch (err) {
        res.send("Something went wrong");
        console.log(err);
    }
};

const getUser = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);
      } catch (err) {
        res.status(500).json({ error: "Failed to fetch users" });
      }
  };
  
  const updateUser = async (req, res) => {
    const { fullName, userName, email, password } = req.body;
  
    try {
      const user = await UserModel.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      user.fullName = fullName;
      user.userName = userName;
      user.email = email;
  
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 5);
        user.password = hashedPassword;
      }
  
      await user.save();
      res.json({ message: "User updated successfully" });
    } catch (err) {
      res.status(500).json({ error: "Failed to update user" });
    }
  };
  
  const deleteUser = async (req, res) => {
    try {
      const user = await UserModel.findByIdAndDelete(req.params.userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ message: "User deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete user" });
    }
  };
  
  module.exports = {
    registerUser,
    loginUser,
    getUser,
    updateUser,
    deleteUser,
  };
