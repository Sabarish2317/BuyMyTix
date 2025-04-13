const Fuse = require("fuse.js");
const axios = require("axios");
const EventReference = require("../model/eventReferenceModel");

/**
 * Search function that returns event titles and posters for autocomplete
 * @param {string} q - Search query
 * @param {number} limit - Maximum number of results (default: 5)
 * @returns {Promise<Array>} - Array of event titles and posters
 */
async function searchEventTitles(q, limit = 5, y) {
  try {
    // Step 1: Search through existing event references in database
    const localResults = await searchLocalEvents({ q, y }, limit);

    // Step 2: If we have enough local results, return them
    if (localResults.length >= limit) {
      return localResults.slice(0, limit);
    }

    // Step 3: If we need more results, search OMDb API
    const remainingLimit = limit - localResults.length;
    if (remainingLimit > 0) {
      const omdbResults = await searchOMDb(q, remainingLimit, y);
      return [...localResults, ...omdbResults].slice(0, limit);
    }

    return localResults;
  } catch (error) {
    console.error("Search error:", error);
    throw new Error("Failed to perform search");
  }
}

/**
 * Search local database for events matching the query
 */
async function searchLocalEvents(query, limit) {
  // Get all event references from the database
  const events = await EventReference.find({})
    .select("title Poster type")
    .lean();

  // Configure Fuse.js for searching
  const fuseOptions = {
    keys: ["title"],
    threshold: 0.4, // Lower threshold means more exact matching
    includeScore: true,
  };

  const fuse = new Fuse(events, fuseOptions);
  const results = fuse.search(query);

  // Format results - only include title and poster
  return results.slice(0, limit).map((result) => ({
    eventId: result.item._id,
    title: result.item.title,
    poster: result.item.Poster || null,
    type: result.item.type,
    source: "database",
  }));
}

/**
 * Search OMDb API for movies matching the query
 */
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

// Express route handler
const autocompleteHandler = async (req, res) => {
  try {
    const { q, y } = req.query;

    if (!q || !y) return res.status(400).send("Missing query or year");

    if (!q || q.trim() === "") {
      return res.status(400).json({ error: "Search query is required" });
    }

    const results = await searchEventTitles(q, 5, y ? y.trim() : null);
    return res.json({ results });
  } catch (error) {
    console.error("Autocomplete handler error:", error);
    return res.status(500).json({ error: "Search failed" });
  }
};

module.exports = autocompleteHandler;
