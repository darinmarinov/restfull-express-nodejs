"use strict";

var names = require("./names");

// Handle Get Name actions
exports.get_name = (req, res) => {
  let nameId = req.params.name;

  let name = names.filter(n => {
    return n.name == nameId;
  });

  if (!name) {
    res.status(404).json({ message: "This Name not found" });
  }

  res.json(name[0]);
};

// Handle Update Name actions
exports.update_names = (req, res) => {
  let nameId = req.params.name;
  let ttl = parseInt(req.body.ttl);
  let name = names.filter(n => {
    return n.name == nameId;
  })[0];

  const index = names.indexOf(name);
  let keys = Object.keys(req.body);

  keys.forEach(key => {
    name[key] = req.body[key];
  });

  names[index] = name;
  
  // Set Timeout to return response which depend from ttl - value
  setTimeout(() => {
    res.json(names[index]);
  }, ttl);

  if (ttl > 30000) {
    res.end("REQUEST TIMEOUT => change the ttl to be less 30s");
  }
};

// Handle Delete Name actions
exports.delete_name = (req, res) => {
  let nameId = req.params.id;

  let name = names.filter(name => {
    return name.id == nameId;
  })[0];

  const index = names.indexOf(name);

  names.splice(index, 1);

  res.json({ message: `User ${nameId} deleted.`});
};
