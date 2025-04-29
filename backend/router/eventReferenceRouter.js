const express = require("express");
const {
  autocompleteHandler,
  searchDbTitlesHandler,
} = require("../controller/searchController");
const addTitles = require("../controller/eventReferenceController");
const checkToken = require("../middleware/authware");
const router = express.Router();
const { home } = require("../controller/homeController");

router.get("/titles", autocompleteHandler); //typically for autcomplete
router.get("/search", searchDbTitlesHandler); //for all around search with results and filters
router.post("/titles", addTitles);
router.get("/home", home);
module.exports = router;
