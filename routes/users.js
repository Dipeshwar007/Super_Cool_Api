// default packedge
const express  = require("express");
const userRouter = express.Router();

// middleware
const userValidation  = require("../middleware/usersAuth")

// schemas
const { signupSchema, loginSchema } = require("../validationSchema/userSchema");

// controllers
const { signup,login } = require("../controller/users");


userRouter.post("/signup",userValidation(signupSchema),signup);
userRouter.post("/login",userValidation(loginSchema),login);

module.exports = userRouter;