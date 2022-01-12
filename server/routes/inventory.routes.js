const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Import ORN model
const { Inventory } = require("../models");
const { request } = require("express");

// Inventory CRUD service routes

// Route to CREATE inventory item
app.post("/createItem", (req, res) => {
  Inventory.create({
    name: req.body.name,
    quantity: req.body.quantity,
    unitValue: req.body.unitValue,
    location: req.body.location,
  })
    .then((item) => {
      // Send created item with status: "Created"
      res.status(201).send(item);
    })
    .catch((err) => {
      // Send status: "Internal Server Error"
      res.status(500).send("Internal Server Error");
    });
});

// Route to READ all inventory items
app.get("/getItems", (req, res) => {
  Inventory.findAll()
    .then((items) => {
      // Send items with status: "OK"
      res.status(200).send(items);
    })
    .catch((err) => {
      // Send status: "Not Found"
      res.status(404).send("Not found");
    });
});

// Route to UPDATE inventory items
app.put("/updateItem", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const quantity = req.body.quantity;
  const unitValue = req.body.unitValue;
  const location = req.body.location;

  Inventory.update(
    {
      name: name,
      quantity: quantity,
      unitValue: unitValue,
      location: location,
    },
    { where: { id: id }, returning: true, plain: true }
  )
    .then(() => {
      Inventory.findOne({ where: { id: id } })
        .then((item) => {
          res.status(200).send(item);
        })
        .catch((err) => {
          // Send status: "Internal Server Error"
          res.status(500).send();
        });
    })
    .catch((err) => {
      // Send status: "Bad Request"
      res.status(400).send("Bad Request");
    });
});

// Route to DELETE inventory items
app.delete("/deleteItem", (req, res) => {
  const id = req.body.id;
  Inventory.destroy({ where: { id: id } })
    .then((item) => {
      // Send status: "OK"
      res.status(200).send("Item deleted");
    })
    .catch((err) => {
      // Send status: "Bad Request"
      res.status(400).send("Bad Request");
    });
});

module.exports = app;
