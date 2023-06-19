// default packedge
const express  = require("express");
const userRouter = express.Router();

// middleware
const Validation  = require("../middleware/JoiAuth")

// schemas
const { signupSchema, loginSchema } = require("../validationSchema/userSchema");

// controllers
const { signup,login } = require("../controller/users");


userRouter.post("/signup",Validation(signupSchema),signup);
userRouter.post("/login",Validation(loginSchema),login);

module.exports = userRouter;