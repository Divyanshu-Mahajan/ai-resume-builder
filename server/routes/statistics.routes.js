const express = require("express");
const router = express.Router();
const statisticsController = require("../controllers/statistics.controller");
const { verifyJWT } = require("../middlewares/auth.middleware");


router.route("/").get(verifyJWT, statisticsController.getUserStatistics);

module.exports = router