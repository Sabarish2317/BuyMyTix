const Fuse = require("fuse.js");
const axios = require("axios");
const EventReference = require("../model/eventReferenceModel");

/**
 * Search function that returns event titles and posters for autocomplete
 * @param {string} q - Search query
 * @param {number} limit - Maximum number of results (default: 5)
 * @param {string|number} y - Optional year filter
 * @returns {Promise<Array>} - Array of event titles and posters
 */
async function searchEventTitles(q, limit = 5, y) {
  try {
    const localResults = await searchLocalEvents(q, limit, y);

    // If local results are enough
    if (localResults.length >= limit) {
      return localResults.slice(0, limit);
    }

    // Fill remaining with OMDB results if needed
    const remainingLimit = limit - localResults.length;
    const omdbResults = await searchOMDb(q, remainingLimit, y);

    return [...localResults, ...omdbResults].slice(0, limit);
  } catch (error) {
    console.error("Search error:", error);
    throw new Error("Failed to perform search");
  }
}

/**
 * Search local MongoDB eventReference collection
 */
async function searchLocalEvents(query, limit, year) {
  let filter = {};
  if (year) {
    filter.releaseYear = parseInt(year);
  }

  const events = await EventReference.find(filter)
    .select("title Poster type description releaseYear")
    .lean();

  // Fuse.js setup
  const fuse = new Fuse(events, {
    keys: ["title"],
    threshold: 0.4,
    includeScore: true,
  });

  const results = fuse.search(query);

  return results.slice(0, limit).map((result) => ({
    eventId: result.item._id,
    title: result.item.title,
    poster: result.item.Poster || null,
    type: result.item.type,
    description: result.item.description || "",
    releaseYear: result.item.releaseYear || null,
    source: "database",
  }));
}

/**
 * Search OMDb API for movies matching the query
 */
async function searchOMDb(query, limit, year) {
  try {
    const OMDB_API_KEY = process.env.OMDB_API_KEY;
    const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}${year ? `&y=${year}` : ""}`;

    const response = await axios.get(url);

    if (response.data.Response === "True" && response.data.Search) {
      return response.data.Search.slice(0, limit).map((movie) => ({
        title: movie.Title,
        poster: movie.Poster !== "N/A" ? movie.Poster : null,
        type: "Movie",
        source: "omdb",
        externalId: movie.imdbID,
        year: movie.Year,
      }));
    }

    return [];
  } catch (error) {
    console.error("OMDb API error:", error);
    return [];
  }
}

/**
 * Express handler for /autocomplete route
 */
const autocompleteHandler = async (req, res) => {
  try {
    const { q, y } = req.query;

    if (!q || q.trim() === "") {
      return res.status(400).json({ error: "Search query is required" });
    }

    const results = await searchEventTitles(q.trim(), 5, y?.trim());
    return res.json({ results });
  } catch (error) {
    console.error("Autocomplete handler error:", error);
    return res.status(500).json({ error: "Search failed" });
  }
};

module.exports = autocompleteHandler;
