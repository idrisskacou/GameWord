/* Get homepage */
const contact = (req, res) => {
  res.render("contact", { title: "LAUNCH CONTACT" });
};

module.exports = {
  contact,
};
