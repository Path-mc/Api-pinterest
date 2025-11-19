const express = require("express");
const app = express();
const { searchPinterestAPI } = require("./pinterest");

// PORT yang benar untuk VPS / Railway / Pterodactyl
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    status: true,
    message: "Pinterest API is running",
    usage: "/search?query=elaina&limit=20"
  });
});

app.get("/search", async (req, res) => {
  try {
    const query = req.query.query;
    const limit = parseInt(req.query.limit) || 10;

    if (!query) {
      return res.json({ status: false, error: "Parameter 'query' wajib ada" });
    }

    const data = await searchPinterestAPI(query, limit);

    res.json({
      status: true,
      query,
      count: data.length,
      results: data,
    });

  } catch (e) {
    res.json({ status: false, error: e.message });
  }
});

// Listen
app.listen(PORT, "0.0.0.0", () => {
  console.log("API jalan di port", PORT);
});
