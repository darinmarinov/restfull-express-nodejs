"use strict";

let items = require("./items");

// Handle Get Last Item actions
exports.get_last_item = (req, res) => {
  var getLastItem = items[items.length - 1];
  res.status(200).json({ getLastItem });
  if (!items) {
    req.status(404).json({ message: "Item not found" });
  }
};

// Handle Create Item actions
exports.create_item = (req, res) => {
  let name = {
    name: req.body.name
  };
  items.push(name);
  res.json(name);
};
