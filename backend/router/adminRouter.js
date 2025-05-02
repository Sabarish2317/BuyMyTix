const EventReference = require("../model/eventReferenceModel");
const express = require("express");
const router = express.Router();
const Report = require("../model/reportsModel");

router.get("/admin/titles", async (req, res) => {
  const { page = 1, limit = 10, type, search } = req.query;

  try {
    const pageNumber = parseInt(page);
    const pageSize = parseInt(limit);

    // Build dynamic query
    const query = {};

    if (type && ["Movie", "Sport", "Event"].includes(type)) {
      query.type = type;
    }

    if (search && typeof search === "string") {
      query.title = {
        $regex: search.trim(),
        $options: "i", // case-insensitive
      };
    }

    const total = await EventReference.countDocuments(query);

    const titles = await EventReference.find(query)
      .sort({ createdAt: -1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    res.status(200).json({
      data: titles,
      totalPages: Math.ceil(total / pageSize),
      currentPage: pageNumber,
    });
  } catch (err) {
    console.error("Error fetching titles:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

// Create new title
router.post(
  "/admin/titles",
  (createTitle = async (req, res) => {
    const { title, description, poster, type, year, source, rating, imdbID } =
      req.body;

    if (!title || !description || !poster || !type || !year) {
      return res.status(400).send("All required fields must be provided");
    }

    try {
      const existing = await EventReference.findOne({ title });
      if (existing) return res.status(409).send("Title already exists");

      const newEvent = new EventReference({
        title,
        description,
        poster,
        type,
        year,
        source,
        rating,
        imdbID,
      });
      await newEvent.save();
      res.status(201).json({ message: "Title created", event: newEvent });
    } catch (err) {
      console.error("Error creating title:", err);
      res.status(500).json({ error: "Failed to create title" });
    }
  })
);

// Update title
router.put("/admin/titles/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updated = await EventReference.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) return res.status(404).send("Title not found");

    res.json({ message: "Updated", event: updated });
  } catch (err) {
    res.status(500).json({ error: "Failed to update title" });
  }
});

// Delete title
router.delete("/admin/titles", async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }

  try {
    const deleted = await EventReference.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Title not found" });
    }
    res.json({ message: "Title deleted successfully" });
  } catch (err) {
    console.error("Error deleting title:", err);
    res.status(500).json({ error: "Failed to delete title" });
  }
});

router.get(
  "/admin/reports",
  (getReports = async (req, res) => {
    try {
      const reports = await Report.find()
        .populate({
          path: "reporterId",
          select: "email name",
        })
        .populate({
          path: "reportedId",
          select: "email name",
        });

      if (!reports.length) {
        return res.status(404).send("No reports found");
      }

      // Format response
      const formattedReports = reports.map((report) => ({
        reportId: report._id,
        reporter: {
          id: report.reporterId._id,
          email: report.reporterId.email,
          name: report.reporterId.name,
        },
        reported: {
          id: report.reportedId._id,
          email: report.reportedId.email,
          name: report.reportedId.name,
        },
        reason: report.reason,
        date: report.createdAt,
      }));

      return res.status(200).json(formattedReports);
    } catch (error) {
      console.error("Error fetching reports:", error);
      return res.status(500).send("Server error");
    }
  })
);

module.exports = router;
