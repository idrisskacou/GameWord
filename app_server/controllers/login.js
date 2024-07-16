/* Get homepage */
const login = (req, res) => {
    res.render("login", { title: "LAUNCH TRACHER LOGIN" });
  };
  
  module.exports = {
    login,
  };
  