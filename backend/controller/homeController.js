const TicketListing = require("../model/ticketListingModel");
const EventReference = require("../model/eventReferenceModel");

const home = async (req, res) => {
  try {
    const { type, category } = req.query;

    if (!type) {
      return res.status(400).json({ error: "Query param 'type' is required" });
    }

    // Set default to "Movie" if category is not provided
    const eventType = category || "Movie";

    if (!["Movie", "Sport", "Event"].includes(eventType)) {
      return res.status(400).json({ error: "Invalid 'category' value" });
    }

    if (type === "popular") {
      const popular = await TicketListing.aggregate([
        {
          $lookup: {
            from: "eventreferences",
            localField: "eventRef",
            foreignField: "_id",
            as: "eventData",
          },
        },
        { $unwind: "$eventData" },
        { $match: { "eventData.type": eventType } },
        {
          $group: {
            _id: "$eventRef",
            count: { $sum: "$ticketQuantity" },
            event: { $first: "$eventData" },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 10 },
        {
          $project: {
            _id: 0,
            event: 1,
            ticketsListed: "$count",
          },
        },
      ]);

      return res.status(200).json(popular);
    }

    if (type === "latest" || type === "trending") {
      const latest = await EventReference.find({ type: eventType })
        .sort({ createdAt: -1 })
        .limit(10);

      return res.status(200).json(latest);
    }

    return res.status(400).json({ error: "Invalid 'type' value provided" });
  } catch (err) {
    console.error("Error in movie controller:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { home };
