const TicketListing = require("../model/ticketListingModel");
const EventReference = require("../model/eventReferenceModel");
const { redisClient, connectRedis } = require("../utils/redisClient");

const home = async (req, res) => {
  try {
    await connectRedis();

    const { type, category, page = 1, pageSize = 10 } = req.query;

    if (!type) {
      return res.status(400).json({ error: "Query param 'type' is required" });
    }

    const eventType = category || "Movie";

    if (!["Movie", "Sport", "Event"].includes(eventType)) {
      return res.status(400).json({ error: "Invalid 'category' value" });
    }

    const pageNum = parseInt(page);
    const limit = parseInt(pageSize);
    const skip = (pageNum - 1) * limit;

    const cacheKey = `home:${type}:${eventType}:page:${pageNum}:pageSize:${limit}`;

    // Try fetching from Redis
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log("✅ Cache hit");
      return res.status(200).json(JSON.parse(cachedData));
    }

    let data;

    if (type === "popular") {
      data = await TicketListing.aggregate([
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
        { $skip: skip },
        { $limit: limit },
        {
          $project: {
            _id: 0,
            event: 1,
            ticketsListed: "$count",
          },
        },
      ]);
    } else if (type === "latest" || type === "trending") {
      data = await EventReference.find({ type: eventType })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    } else {
      return res.status(400).json({ error: "Invalid 'type' value provided" });
    }

    // Cache result for 5 minutes
    console.log("⏳ Cache miss - writing to Redis");
    await redisClient.setEx(cacheKey, 300, JSON.stringify(data));

    return res.status(200).json(data);
  } catch (err) {
    console.error("❌ Error in movie controller:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { home };
