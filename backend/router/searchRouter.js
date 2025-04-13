const express = require("express");
const autocompleteHandler = require("../controller/searchController");

const router = express.Router();

router.get("/search/titles", autocompleteHandler);

module.exports = router;
