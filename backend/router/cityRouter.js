const express = require("express");
const router = express.Router();

const Fuse = require("fuse.js");
const stateDistricts = require("../Utils/cities.json");

const fuse = new Fuse(stateDistricts.states, {
  keys: ["state", "districts"],
  includeScore: true,
  threshold: 0.4,
});

const searchDistricts = (query) => {
  if (!query || query.length < 2) return [];

  const results = fuse.search(query);
  const matchedDistricts = [];

  results.forEach(({ item }) => {
    // match state
    if (item.state.toLowerCase().includes(query.toLowerCase())) {
      matchedDistricts.push({ city: item.state, state: item.state });
    }

    // match district
    item.districts.forEach((district) => {
      if (district.toLowerCase().includes(query.toLowerCase())) {
        matchedDistricts.push({ city: district, state: item.state });
      }
    });
  });

  // Remove duplicates based on city + state
  const unique = matchedDistricts.filter(
    (value, index, self) =>
      index ===
      self.findIndex((v) => v.city === value.city && v.state === value.state)
  );

  return unique;
};

const getCity = async (search) => {
  return searchDistricts(search);
};

router.get("/cities", async (req, res) => {
  const { search } = req.query;
  try {
    const cities = await getCity(search);
    res.json(cities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch cities." });
  }
});

module.exports = router;
