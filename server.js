// Requiring necessary npm packages
var express = require("express");

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 3000;
// Accessing all the models in models folder
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = express();

// middleware functions that enables url parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Importing public folder to server.js
app.use(express.static("public"));


// Set Handlebars.
var exphbs = require("express-handlebars");

// Makes main.handlebars the main template for handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Requiring our routes
require("./routes/api-routes.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});
