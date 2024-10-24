/* Get homepage */
const about = (req, res, next) => {
  res.render("about",{title: "History of launch"});
};

module.exports = {
  about,
};
