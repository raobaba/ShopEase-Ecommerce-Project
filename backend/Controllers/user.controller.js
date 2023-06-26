const { UserModel } = require("../Models/user.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const { fullName, userName, email, password } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Error in hashing password' });
      } else {
        const user = new UserModel({ fullName, userName, email, password: hash });
        await user.save();
        res.status(200).json({ success: true, message: 'Registered' });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: 'Error in registering the user' });
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
          // Set the token in the response headers
          res.setHeader('Authorization', `Bearer ${token}`);
          res.status(200).json({ success: true, message: 'Login Successful', token });
        } else {
          res.status(401).json({ success: false, message: 'Wrong Credentials' });
        }
      });
    } else {
      res.status(401).json({ success: false, message: 'Wrong Credentials' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
};


const getUser = async (req, res) => {
  try {
    const users = await UserModel.find({}, { password: 0 });
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Failed to fetch users" });
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
    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update user" });
  }
};

  
const deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.log(err);
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
