const express = require("express");
const router = express.Router();
const aiController = require("../controllers/ai.controller");

router.route("/generate-summary").post(aiController.generateSummary);

router.route("/generate-education-description").post(aiController.generateStudentDescription);

router.route("/generate-job-responsibility").post(aiController.generateCompanyResponsibility);

router.route("/generate-project-description").post(aiController.generateProjectDescription);

module.exports = router 