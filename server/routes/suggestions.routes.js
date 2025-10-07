const express = require("express");
const router = express.Router();
const suggestionsController = require("../controllers/suggestions.controller");
const { verifyJWT } = require("../middlewares/auth.middleware");

router.route("/").get(verifyJWT, suggestionsController.getUserSuggestions);

module.exports = router;