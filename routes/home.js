const express  = require("express");
const { getHome } = require("../controller/home");

const homeRouter = express.Router();

homeRouter.get("/",getHome);

module.exports = homeRouter;