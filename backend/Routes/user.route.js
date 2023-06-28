const express = require("express");
const { authenticate } = require("../Middlewares/authenticate.middleware");
const {
  registerUser,
  loginUser,
  getUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("../Controllers/user.controller.js");

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/getUser", authenticate, getUser);
userRouter.get("/:userId",authenticate,getUserById)
userRouter.put("/:userId", authenticate, updateUser);
userRouter.delete("/:userId", authenticate, deleteUser);

module.exports = userRouter;
