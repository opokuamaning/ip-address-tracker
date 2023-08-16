const AppRouter = require("express").Router();
const HomeController = require("../Controller/HomeController");

AppRouter.get("/", HomeController.getHomePage);
AppRouter.get("/ip-info/:ipAddress", HomeController.getIpInfo)

module.exports = AppRouter;