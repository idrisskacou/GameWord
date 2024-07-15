const fs = require("fs");

const news = (req, res) => {
  let launchdata;
  try {
    launchdata = JSON.parse(fs.readFileSync("./data/launch.json", "utf8"));
  } catch (error) {
    console.error("Error reading launch data:", error);
    return res.status(500).send("Error reading launch data");
  }
  res.render("news", { title: "GAME WORLD NEWS", launchdata });
};

module.exports = {
  news,
};
