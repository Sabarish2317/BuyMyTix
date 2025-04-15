const express = require("express");
const autocompleteHandler = require("../controller/searchController");
const addTitles = require("../controller/eventReferenceController");
const router = express.Router();

router.get("/titles", autocompleteHandler);
router.post("/titles", addTitles);

module.exports = router;
