/* Get homepage */
const index = (req, res) => {
  res.render("index", { title: "LAUNCH TRACHER" });
};

module.exports = {
  index,
};
