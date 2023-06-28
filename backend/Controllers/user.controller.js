const { UserModel } = require("../Models/user.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const { fullName, userName, email, password, isAdmin } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
      // Email is already in use
      res.status(400).json({ success: false, message: 'This email is already in use. Try to register with another email.' });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          console.log(err);
          res.status(500).json({ success: false, message: 'Error in hashing password' });
        } else {
          const user = new UserModel({ fullName, userName, email, password: hash, isAdmin }); // Include isAdmin field
          await user.save();
          res.status(200).json({ success: true, message: 'Registered' });
        }
      });
    }
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
          const token = jwt.sign({ userID: user._id, isAdmin: user.isAdmin }, process.env.key);
          // Set the token in the response headers
          res.setHeader('Authorization', `Bearer ${token}`);
          res.status(200).json({ success: true, message: 'Login Successful', token, userID: user._id });
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
const getUserById = async (req, res) => {
  const userId = req.params.userId; // Assuming the user ID is provided in the request parameters

  try {
    const user = await UserModel.findById(userId, { password: 0 }); // Exclude the password field from the query result
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Failed to fetch user" });
  }
};


const updateUser = async (req, res) => {
  const { fullName, userName, email, password, isAdmin } = req.body;
  try {
    const user = await UserModel.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.fullName = fullName;
    user.userName = userName;
    user.email = email;
    user.isAdmin = isAdmin;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 5);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    res.status(200).json({ message: "User updated successfully", user: updatedUser });
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
    getUserById,
    updateUser,
    deleteUser,
  };
