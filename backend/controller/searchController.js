const Fuse = require("fuse.js");
const axios = require("axios");
const EventReference = require("../model/eventReferenceModel");

async function searchEventTitles(q, limit = 5, y, type) {
  try {
    const localResults = await searchLocalEvents(q, limit, y, type);

    // If local results are enough or OMDB isn't needed
    if (
      localResults.length >= limit ||
      (type && type !== "Movie" && type !== "All")
    ) {
      return localResults.slice(0, limit);
    }

    const remainingLimit = limit - localResults.length;
    const omdbResults = await searchOMDb(q, remainingLimit, y);

    return [...localResults, ...omdbResults].slice(0, limit);
  } catch (error) {
    console.error("Search error:", error);
    throw new Error("Failed to perform search");
  }
}

async function searchLocalEvents(query, limit, year, type) {
  let filter = {};
  if (year) filter.year = year;
  if (type && type !== "All") filter.type = type;

  const events = await EventReference.find(filter)
    .select("title poster type description year source rating imdbID")
    .lean();

  const fuse = new Fuse(events, {
    keys: ["title"],
    threshold: 0.4,
    includeScore: true,
  });

  const results = fuse.search(query);

  return results.slice(0, limit).map((result) => ({
    eventId: result.item._id,
    title: result.item.title,
    poster: result.item.poster || null,
    type: result.item.type,
    description: result.item.description || "",
    year: result.item.year || null,
    source: result.item.source || "database",
    rating: result.item.rating || null,
    imdbID: result.item.imdbID || null,
  }));
}

async function searchOMDb(query, limit, year) {
  try {
    const OMDB_API_KEY = process.env.OMDB_API_KEY;
    const searchUrl = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}${year ? `&y=${year}` : ""}`;
    const response = await axios.get(searchUrl);

    if (response.data.Response === "True" && response.data.Search) {
      const topResults = response.data.Search.slice(0, limit);
      const imdbIDs = topResults.map((m) => m.imdbID);
      const existing = await EventReference.find({
        imdbID: { $in: imdbIDs },
      }).select("imdbID");
      const existingIDs = new Set(existing.map((e) => e.imdbID));
      const filtered = topResults.filter((m) => !existingIDs.has(m.imdbID));

      const detailedResults = await Promise.all(
        filtered.slice(0, limit).map(async (movie) => {
          try {
            const detailsUrl = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${movie.imdbID}${year ? `&y=${year}` : ""}`;
            const detailsResponse = await axios.get(detailsUrl);

            if (detailsResponse.data.Response === "True") {
              return {
                title: detailsResponse.data.Title,
                poster:
                  detailsResponse.data.Poster !== "N/A"
                    ? detailsResponse.data.Poster
                    : null,
                type: "Movie",
                source: "omdb",
                description: detailsResponse.data.Plot || "",
                rating: detailsResponse.data.imdbRating || null,
                year: detailsResponse.data.Year || null,
                imdbID: detailsResponse.data.imdbID,
              };
            }
          } catch {}
          return {
            title: movie.Title,
            poster: movie.Poster !== "N/A" ? movie.Poster : null,
            type: "Movie",
            source: "omdb",
            description: "",
            rating: null,
            year: movie.Year,
            imdbID: movie.imdbID,
          };
        })
      );

      return detailedResults;
    }

    return [];
  } catch (error) {
    console.error("OMDb API error:", error);
    return [];
  }
}

// Handler
const autocompleteHandler = async (req, res) => {
  try {
    let { source, q, y, type } = req.query;

    if (!q || q.trim() === "") {
      return res.status(400).json({ error: "Search query is required" });
    }

    const query = q.trim();
    let year = y?.trim();
    type = type?.trim() || "All";

    if (year === "All") year = "";

    // Handle source
    if (source === "db") {
      const results = await searchLocalEvents(query, 5, year, type);
      return res.status(200).json({ results });
    }

    if (source === "omdb") {
      if (type !== "Movie") {
        return res.status(200).json({ results: [] }); // Not applicable
      }
      const results = await searchOMDb(query, 3, year);
      return res.status(200).json({ results });
    }

    if (source === "All" || !source) {
      const results = await searchEventTitles(query, 5, year, type);
      return res.status(200).json({ results });
    }

    return res.status(400).json({ error: "Invalid source type" });
  } catch (error) {
    console.error("Autocomplete handler error:", error);
    return res.status(500).json({ error: "Search failed" });
  }
};

module.exports = autocompleteHandler;
