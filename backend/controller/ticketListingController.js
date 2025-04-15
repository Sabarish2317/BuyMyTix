const express = require("express");
const router = express.Router();

const TicketListing = require("../model/ticketListingModel");
const User = require("../model/userModel");
const EventReference = require("../model/eventReferenceModel");

const ticketListingController = async (req, res) => {
  try {
    let {
      email,
      eventRef, // should be the ObjectId of EventReference
      venue,
      ticketQuantity,
      ticketPrice,
      showTime,
      seatDetails = {}, // entryGate, row, seatNumbers
      userDescription,
      expiryTime,
    } = req.body;

    email = email.trim().toLowerCase();

    // Validate required fields
    if (
      !email ||
      !venue ||
      !eventRef ||
      !ticketQuantity ||
      !ticketPrice ||
      !showTime ||
      !seatDetails?.seatNumbers ||
      !expiryTime
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    // Fetch sellerId from email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if eventRef is valid
    const event = await EventReference.findById(eventRef);
    if (!event)
      return res.status(404).json({ message: "Event reference not found" });

    const formattedSeatDetails = {
      seatNumbers: seatDetails.seatNumbers,
      entryGate: seatDetails.entryGate || null,
      row: seatDetails.row || null,
    };

    const newTicket = new TicketListing({
      sellerId: user._id,
      eventRef: event._id,
      eventRef,
      venue,
      ticketQuantity,
      ticketPrice,
      showTime,
      seatDetails: formattedSeatDetails,
      userDescription,
      expiryTime: showTime,
    });

    await newTicket.save();

    return res
      .status(201)
      .json({ message: "Ticket listed successfully", ticket: newTicket });
  } catch (error) {
    console.error("Error creating ticket listing:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getTicketsByEventRefId = async (req, res) => {
  const { eventRefId } = req.query;

  if (!eventRefId) {
    return res.status(400).json({ message: "Event reference ID is required" });
  }

  try {
    const tickets = await TicketListing.find({ eventRef: eventRefId })
      .populate("sellerId", "name email profileImage") // Optional: Include seller info
      .populate("eventRef", "title type releaseYear") // Optional: Include event info
      .sort({ createdAt: -1 }) // Optional: Latest first
      .lean();

    if (tickets.length === 0) {
      return res
        .status(404)
        .json({ message: "No tickets found for this event" });
    }

    return res.status(200).json({ tickets });
  } catch (error) {
    console.error("Error fetching tickets by eventRefId:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { ticketListingController, getTicketsByEventRefId };
