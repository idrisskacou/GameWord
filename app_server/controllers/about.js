/* Get homepage */
const about = (req, res) => {
  res.render("about", { title: "History of Launch" });
};

module.exports = {
  about,
};
