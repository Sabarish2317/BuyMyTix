const EventReference = require("../model/eventReferenceModel");

const addTitle = async (req, res) => {
  if (!req.body) return res.status(400).send("Request body missing");

  const { title, description, poster, type, releaseYear } = req.body;

  if (!title || !description || !poster || !type || !releaseYear) {
    return res.status(400).send("All fields are required");
  }

  if (type !== "Movie" && type !== "Sport" && type !== "Event") {
    return res.status(400).send("Invalid field");
  }
  try {
    const existingEvent = await EventReference.findOne({ title });

    if (existingEvent) {
      return res.status(409).send("Title already exists");
    }

    const newEvent = new EventReference({
      title,
      description,
      poster,
      type,
      releaseYear,
    });

    await newEvent.save();

    return res
      .status(201)
      .json({ message: "Event added successfully", event: newEvent });
  } catch (err) {
    console.error("Error adding title:", err);
    return res.status(500).send("An error occurred while adding title");
  }
};

module.exports = addTitle;
