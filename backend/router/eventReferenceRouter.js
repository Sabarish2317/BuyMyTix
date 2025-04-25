const express = require("express");
const autocompleteHandler = require("../controller/searchController");
const addTitles = require("../controller/eventReferenceController");
const checkToken = require("../middleware/authware");
const router = express.Router();
const { home } = require("../controller/homeController");

router.get("/titles", autocompleteHandler);
router.post("/titles", addTitles);
router.get("/home", home);
module.exports = router;
