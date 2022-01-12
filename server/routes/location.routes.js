const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Import ORN model
const { Location } = require("../models");

// Location API routes

// Route to CREATE location
app.post("/createLocation", (req, res) => {
  Location.create(req.body)
    .then((item) => {
      // Send created location with status: "Created"
      res.status(201).send(item);
    })
    .catch((err) => {
      // Send status: "Internal Server Error"
      res.status(500).send("Internal Server Error");
    });
});

// Route to READ all locations items
app.get("/getLocations", (req, res) => {
  Location.findAll()
    .then((loc) => {
      // Send locations with status: "OK"
      res.status(200).send(loc);
    })
    .catch((err) => {
      // Send status: "Not Found"
      res.status(404).send("Not found");
    });
});

// Route to DELETE locations
app.delete("/deleteLocation", (req, res) => {
  const id = req.body.id;
  Location.destroy({ where: { id: id } })
    .then((item) => {
      // Send status: "OK"
      res.status(200).send("Location deleted");
    })
    .catch((err) => {
      // Send status: "Bad Request"
      res.status(400).send("Bad Request");
    });
});

module.exports = app;
