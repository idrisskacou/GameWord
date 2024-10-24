// launchcontrollersdata.js
const express = require("express");
const app = express ();
const datajson = require("../data/trips.json"); // JSON data hard code 
const db = require("../routes/index"); 

const APIPORT = 3002;
const listdata = async (req, res) => {
  try {
    // Send the JSON data as the response
    const launchId = req.params.id;
    res.status(200).json(datajson);
  } catch (error) {
    // Handle errors, if any occur
    res.status(500).json({ message: "Error fetching launch data", error: error.message });
  }
};

const getLaunchById = async (req, res) => {
  try {
    const launchId = req.params.id; // Get the ID from the request parameters
    const launch = datajson[launchId]; // Access the launch data by ID (as the keys are strings)

    if (launch) {
      res.status(200).json(launch); // Return the found launch
    } else {
      res.status(404).json({ message: "Launch not found" }); // Return 404 if the launch is not found
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching launch data", error: error.message });
  }
};
app.get("/api", listdata);
app.use(express.json());
app.get("/api/launches/:id", getLaunchById);


app.listen(APIPORT, () => {
    console.log("API for the frontend server listening on PORT:", APIPORT);
  });

// Export the function so it can be used in the router
module.exports = getLaunchById , listdata;
