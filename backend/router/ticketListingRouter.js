const express = require("express");
const checkToken = require("../middleware/authware");
const {
  ticketListingController,
  getTicketsByEventRefId,
} = require("../controller/ticketListingController");
const router = express.Router();

router.get("/tickets", getTicketsByEventRefId);
router.post("/tickets", ticketListingController);

module.exports = router;
