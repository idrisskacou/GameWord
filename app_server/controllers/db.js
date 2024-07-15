const express = require("express");
const pg = require("pg");
var fs = require("fs");
require("dotenv").config();

const app = express();

// Database connection setup
const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Query to fetch launch data
const fetchLaunchDataQuery = `
    SELECT 
        id,
        upcoming_launch_image,
        upcoming_launch_title,
        upcoming_launch_date,
        upcoming_launch_time,
        upcoming_launch_base,
        upcoming_launch_location,
        upcoming_launch_rocket,
        upcoming_launch_description,
        upcoming_launch_company,
        url
    FROM launch;
`;

// Function to fetch data from the database
const fetchLaunchData = async () => {
  try {
    await db.connect();
    const res = await db.query(fetchLaunchDataQuery);
    return res.rows;
  } catch (err) {
    console.error("Error executing query", err.stack);
    throw err; // Throw the error to propagate it
  } finally {
    db.end(); // Close the database connection after fetching
  }
};

// Example: Express route to render 'news' view with fetched launch data
app.get("/news", async (req, res) => {
  try {
    const launchdata = await fetchLaunchData(); // Fetch launch data
    res.render("news", { title: "GAME WORD NEWS", launchdata });
  } catch (err) {
    console.error("Error fetching launch data", err.stack);
    res.status(500).json({ error: "Error fetching launch data" });
  }
});

//

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
  process.exit(1); // Exit with non-zero code indicating failure
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1); // Exit with non-zero code indicating failure
});

module.exports = { fetchLaunchData }; // Export fetchLaunchData function
