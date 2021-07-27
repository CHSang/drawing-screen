const express = require("express");
var router = express.Router();
const { v4: uuidv4 } = require("uuid");

let data = {
  list: [],
};
router.get("/create", function (req, res) {
  let id = uuidv4();
  data.list.unshift({ id });
  res.send({ id });
});

router.get("/", function (req, res) {
  res.send(data);
});

module.exports = router;
