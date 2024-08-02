// /* Get homepage */
const { fetchLaunchData } = require("../controllers/db");
var fs = require("fs");
var axios = require("axios");

const news = async (req, res) => {
  try {
    // const launchdata = await fetchLaunchData(); // Fetch launch data
    const launchdata = await fetchLaunchData(); // Fetch launch data
    res.render("news", { title: "LAUNCH API", launchdata });
    console.log(launchdata[1]);
  } catch (err) {
    console.error("Error fetching launch data", err.stack);
    res.status(500).json({ error: "Error fetching launch data" });
  }
};

module.exports = {
  news,
};

