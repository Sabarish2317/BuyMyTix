const express = require("express");
const checkToken = require("../middleware/authware");
const {
  ticketListingController,
  getTicketsByEventRefId,
  deleteTicket,
  updateTicket,
} = require("../controller/ticketListingController");
const router = express.Router();

router.get("/tickets", getTicketsByEventRefId);
router.post("/tickets", ticketListingController);
router.delete("/ticket/:ticketId", checkToken, deleteTicket);
router.put("/ticket/:ticketId", checkToken, updateTicket);

module.exports = router;
