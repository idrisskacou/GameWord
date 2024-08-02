var express = require("express"); // import npm i express and define express
// const https = require('https');
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


// define path of the router of the page
var indexRouter = require("./app_server/routes/index");
// var usersRouter = require("./app_server/routes/users");
var newsRouter = require("./app_server/routes/news");
var apiRouter = require("./app_api/routes/index");
var contactRouter = require("./app_server/routes/contact");
var aboutRouter = require("./app_server/routes/about");
var loginRouter = require("./app_server/routes/login");

// debugging
// Path for views partials
const partialsPath = path.join(__dirname, "views/partials"); // debugging
console.log("Partials path:", partialsPath); // console log to debugging
console.log(process.env.NODE_ENV);

const partialsAppsserver = path.join(__dirname, "app_server", "views"); // debugging
console.log("App_server path:", partialsAppsserver); // console log to debugging


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
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser()); // Sticking cookies/ comment for reload to see response
app.use(express.static(path.join(__dirname, "public")));

// Define bind url + router
app.get("/", indexRouter);
// app.get("/users", usersRouter);
app.get("/news", newsRouter);
app.get("/contact", contactRouter);
app.get("/about", aboutRouter);
app.get("/login", loginRouter);
// app.get('/api', apiRouter); // Request for API to the api router

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
