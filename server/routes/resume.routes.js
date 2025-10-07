const express = require("express");
const router = express.Router();
const resumeController = require("../controllers/resume.controller.js");
const { verifyJWT } = require("../middlewares/auth.middleware.js");

router.route("/").post(verifyJWT, resumeController.createResume);

router.route("/").get(verifyJWT, resumeController.getAllResumes);

router.route("/:id").get(verifyJWT, resumeController.getSingleResume);

router.route("/:id").put(verifyJWT, resumeController.updateResume);

router.route("/:id").delete(verifyJWT, resumeController.deleteResume);

router.route("/").delete(verifyJWT, resumeController.deleteAllResume);

module.exports = router