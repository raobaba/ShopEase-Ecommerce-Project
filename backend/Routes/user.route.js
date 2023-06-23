const express = require("express");
const { authenticate } = require("../Middlewares/authenticate.middleware");
const {
  registerUser
} = require("../Controllers/user.controller.js");

const userRouter = express.Router();

userRouter.post("/register", registerUser);


module.exports = userRouter;
