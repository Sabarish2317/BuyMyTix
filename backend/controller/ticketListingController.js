const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");

const TicketListing = require("../model/ticketListingModel");
const User = require("../model/userModel");
const EventReference = require("../model/eventReferenceModel");

const ticketListingController = async (req, res) => {
  console.log(req.body);
  try {
    let {
      email,
      eventRef, // should be the ObjectId of EventReference
      venue,
      ticketQuantity,
      ticketPrice,
      showTime,
      language,
      screenNo,
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
      language,
      screenNo,
      ticketPrice,
      showTime,
      seatDetails: formattedSeatDetails,
      userDescription,
      expiryTime: showTime,
    });

    await newTicket.save();
    // Push the ticket reference into user's soldTickets
    user.soldTickets.push({ ticket: newTicket._id });
    await user.save();

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
  console.log(eventRefId);
  if (!eventRefId) {
    console.log("Event id is required");
    return res.status(400).json({ message: "Event reference ID is required" });
  }

  try {
    const tickets = await TicketListing.find({ eventRef: eventRefId })
      .populate("sellerId", "email phone") // Fetch email and phone number of the seller
      .populate("eventRef") // Get full event details
      .sort({ createdAt: -1 })
      .lean();

    if (tickets.length === 0) {
      return res
        .status(404)
        .json({ message: "No tickets found for this event" });
    }

    // Get the enriched event data from the first ticket (all tickets have same eventRef)
    const eventData = tickets[0].eventRef;
    const eventFormatted = {
      title: eventData.title,
      poster: eventData.poster,
      type: eventData.type,
      source: eventData.source,
      description: eventData.description,
      rating: eventData.rating,
      year: eventData.year,
      imdbID: eventData.eventId,
    };

    // Get all unique seller userRefs to query their full profile
    const sellerUserRefs = [
      ...new Set(tickets.map((t) => t.sellerId._id.toString())),
    ];

    // Fetch user details for the sellers
    const users = await User.find({ _id: { $in: sellerUserRefs } })
      .select("email phone name profileImage city state") // Select required fields
      .lean();

    // Index users by _id for quick lookup
    const userLookup = Object.fromEntries(
      users.map((user) => [user._id.toString(), user])
    );

    // Format ticket listings
    const ticketMap = {};

    for (const ticket of tickets) {
      const sellerId = ticket.sellerId._id.toString();
      const ticketId = ticket._id.toString();

      ticketMap[ticketId] = {
        ticketDetails: {
          venue: ticket.venue,
          ticketQuantity: ticket.ticketQuantity.toString(),
          ticketPrice: ticket.ticketPrice.toString(),
          showTime: ticket.showTime,
          screenNo: ticket.screenNo,
          language: ticket.language,
          seatDetails: ticket.seatDetails,
          userDescription: ticket.userDescription,
          expiryTime: ticket.expiryTime,
        },
        sellerDetails: {
          email: userLookup[sellerId]?.email || "", // Only include email here
          phone: userLookup[sellerId]?.phone || "", // Include phone number
          name: userLookup[sellerId]?.name || "", // Include name
          profileImage: userLookup[sellerId]?.profileImage || null, // Include profile image (if available)
          city: userLookup[sellerId]?.city || "", // Include city
          state: userLookup[sellerId]?.state || "", // Include state
        },
      };
    }

    return res.status(200).json({
      data: {
        title: eventFormatted,
        listings: ticketMap,
      },
    });
  } catch (error) {
    console.error("Error fetching tickets by eventRefId:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteTicket = async (req, res) => {
  let userId = req.user.userId; //comes from auth middleware
  const { ticketId } = req.params;

  if (!userId)
    return res.status(401).send("Unauthorized to delete this ticket");

  if (!ticketId) return res.status(401).send("Ticket id is required ");

  if (!ticketId)
    if (!mongoose.Types.ObjectId.isValid(ticketId)) {
      return res.status(400).json({ message: "Invalid ticket ID" });
    }

  const ticket = await TicketListing.findById(ticketId);
  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  //gives admin access
  const adminUser = await User.findOne({ email: req.user.email });

  if (adminUser && adminUser.type === "admin") {
    userId = ticket.sellerId.toString(); // Use the sellerId from the ticket to replace his id which wll make the rest of runction work
  }

  try {
    if (ticket.sellerId.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this ticket" });
    }

    // Delete the ticket
    await TicketListing.findByIdAndDelete(ticketId);

    // Remove from soldTickets in User model
    await User.updateOne(
      { _id: userId },
      { $pull: { soldTickets: { ticket: ticket._id } } }
    );

    return res.status(200).json({ message: "Ticket successfully deleted" });
  } catch (error) {
    console.error("Error deleting ticket:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const updateTicket = async (req, res) => {
  let userId = req.user.userId;
  const { ticketId } = req.params;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  if (!ticketId || !mongoose.Types.ObjectId.isValid(ticketId)) {
    return res.status(400).json({ message: "Invalid ticket ID" });
  }

  const ticket = await TicketListing.findById(ticketId);

  //give admin his access
  const adminUser = await User.findOne({ email: req.user.email });

  if (adminUser && adminUser.type === "admin") {
    userId = ticket.sellerId.toString(); // Use the sellerId from the ticket to replace his id which wll make the rest of runction work
  }

  try {
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    if (ticket.sellerId.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this ticket" });
    }

    const {
      venue,
      ticketQuantity,
      ticketPrice,
      screenNo,
      language,
      showTime,
      seatDetails,
      userDescription,
      expiryTime,
    } = req.body;

    // Build update object only with valid non-empty values
    const updateFields = {
      venue: venue !== undefined && venue !== "" ? venue : ticket.venue,
      ticketQuantity:
        ticketQuantity !== undefined && ticketQuantity !== ""
          ? ticketQuantity
          : ticket.ticketQuantity,
      ticketPrice:
        ticketPrice !== undefined && ticketPrice !== ""
          ? ticketPrice
          : ticket.ticketPrice,
      screenNo:
        screenNo !== undefined && screenNo !== "" ? screenNo : ticket.screenNo,
      language:
        language !== undefined && language !== "" ? language : ticket.language,
      showTime:
        showTime !== undefined && showTime !== "" ? showTime : ticket.showTime,
      expiryTime:
        expiryTime !== undefined && expiryTime !== ""
          ? expiryTime
          : ticket.expiryTime,
      userDescription:
        userDescription !== undefined && userDescription !== ""
          ? userDescription
          : ticket.userDescription,
      seatDetails: seatDetails
        ? {
            ...ticket.seatDetails,
            ...seatDetails,
          }
        : ticket.seatDetails,
    };

    const updatedTicket = await TicketListing.findByIdAndUpdate(
      ticketId,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      message: "Ticket updated successfully",
      updatedTicket,
    });
  } catch (error) {
    console.error("Error updating ticket:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * User send the bms ticket url from the frontend and this wll parse only the required details and store it in the database,
 * if the title doesnt exist it wll manually create it and attach the ref id else it wll use the exisiting one
 */

const parseBmsTIcket = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json, text/plain, */*",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.9",
        Connection: "keep-alive",
        Referer: "https://in.bookmyshow.com/",
        Origin: "https://in.bookmyshow.com",
        Host: "in.bookmyshow.com",
        "Upgrade-Insecure-Requests": "1",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-User": "?1",
        "Sec-Fetch-Dest": "document",
      },
    });

    const html = response.data;
    const $ = cheerio.load(html);

    // 📄 Extract details here (depends on how the BMS ticket page looks)

    const movieName = $("h1.movie-name").text() || $("div.movie-name").text();
    const theatreName = $("div.theatre-name").text();
    const dateTime = $("div.show-date-time").text();
    const seatInfo = $("div.seat-info").text();

    const parsedTicket = {
      movieName: movieName.trim(),
      theatreName: theatreName.trim(),
      dateTime: dateTime.trim(),
      seatInfo: seatInfo.trim(),
    };

    console.log("🎟️ Parsed Ticket:", parsedTicket);

    res.json(parsedTicket);
  } catch (error) {
    console.error("Failed to fetch and parse ticket:", error);
    res.status(500).json({ error: "Failed to parse ticket" });
  }
};

module.exports = {
  ticketListingController,
  getTicketsByEventRefId,
  deleteTicket,
  updateTicket,
  parseBmsTIcket,
};
