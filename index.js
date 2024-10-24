var express = require("express"); // import npm i express and define express
// const https = require('https');
var routers = express.Router();
var bodyParser = require("body-parser"); // import npm i body-parser and define bodyParser
var pg = require("pg"); // import npm i pg and define pg
var cookieParser = require("cookie-parser"); // import npm i cookieParser and define cookieParser
var path = require("path"); // import npm i path and define path
const fs = require('fs');
var hbs = require("hbs"); // import npm i hbs and define hbs
var csrf = require('csurf');
const app = express(); // Express
const port = 3000; // Port define
require("./app_server/controllers/db"); //
// var secret = tokens.secretSync(); //Create a new CSRF token attached
// var token = tokens.create(secret);
// var axios = require("axios");
const session = require('express-session');


// define path of the router of the page
var indexRouter = require("./app_server/routes/index");
// var usersRouter = require("./app_server/routes/users");
var newsRouter = require("./app_server/routes/news");
var apiRouter = require("./app_api/routes/index");
var contactRouter = require("./app_server/routes/contact");
var aboutRouter = require("./app_server/routes/about");
var loginRouter = require("./app_server/routes/login");
var User = require("./app_server/controllers/auth");
const { noSQLdata } = require("./app_server/controllers/db");
// const authMiddleware = require("./app_server/controllers/auth");
const cors = require('cors');


// debugging
// Path for views partials
const partialsPath = path.join(__dirname, "views/partials"); // debugging
// console.log("Partials path:", partialsPath); // console log to debugging
// console.log(process.env.NODE_ENV);

const partialsAppsserver = path.join(__dirname, "app_server", "views"); // debugging
// console.log("App_server path:", partialsAppsserver); // console log to debugging


// security 
// const csrfProctection = csrf({});

// view engine setup
app.set("views", path.join(__dirname, "app_server", "views"));
hbs.registerPartials(path.join(__dirname, "app_server", "views/partials"));

app.use(express.static("public"));
// app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "hbs"); //
// app.set('views', 'views'); // Frontend Set the 'views' directory for hbs files views
app.set("app_server", "views"); // Backend Set the 'views' directory for hbs files appserver
// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser()); // Sticking cookies/ comment for reload to see response
app.use(express.static(path.join(__dirname, "public")));


// Use session middleware for user session handling
app.use(session({
  secret: 'yourSecretKey',  // Change to a secure secret key
  resave: false,
  saveUninitialized: true
}));

/* POST request to handle login form submission */
const postLogin = async (req, res) => {
  console.log("POST /login hit");
  const { username, password } = req.body;
  // console log the body of the html to see if the input values are being pass.
  console.log("Request body:", req.body);
  // debug to see the sql data base to see the data type
  console.log("noSQLdata:", noSQLdata);
  try {
    // called and redefine the username from the SQL. Make it private 
    const user = noSQLdata.USERNAME;
    // logic condition to see if the user input match the Database user secret username 
    if (username !== user) {
      // console log any error from username ** remove it during production
      // console.log("Username data from the website:", username);
      // console.log("User data refine:", user);
      // console.log("NoSQLdata:", noSQLdata.USERNAME);
      // if username does not match print this code in the terminal
      return res.status(400).send('User not found')
    }
        // logic condition to see if the password input match the Database password secret password 
    const ismatch = noSQLdata.PASSWORD;
    if (password !== ismatch) {
      // alert("Incorrect Password!!!!")
      // console.log(password);
      return res.status(400).send('Invalid credentials')
    }
    // Store user session after successful login
    req.session.user = { username: user };  // Store relevant user data
    console.log("User logged in:", req.session.user);
    // redirect if everything work or check
    res.redirect('/');
  } catch (error) {
    // console log any error found during the check
    console.error("Server error:", error);
    res.status(500).send('Server error');
  }
};

// authMiddleware 
const authMiddleware = (req, res, next) => {
  if (req.path === '/login' || req.path === '/signup') {
      return next();
    }
  // if postlogin was authentificate successfull router allow access to the other url 
  if (req.session.user) {
    // If authenticated, proceed to the next middleware/route
    return next();
  } else {
    // If not authenticated, redirect to login or send an error response
    // return res.status(401).send('Unauthorized: Please log in.');
    const loginpath = res.redirect('/login');
    return res.status(401).send(loginpath);

  }
};
// app.use(session.Cookie)


app.use(authMiddleware);
// app.use(cors(corsOptions));
// Define bind url + router
app.get("/", indexRouter);
// app.get("/users", usersRouter);
app.get("/news", newsRouter);
app.get("/contact", contactRouter);
app.get("/about", aboutRouter);
app.get("/login", loginRouter);
app.post("/login", postLogin);
app.get("/api", apiRouter);



// Error handler middleware
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  // Render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`); // print port to the console
});

module.exports = app;
