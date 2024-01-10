var express = require("express");
var mongo = require("mongoose");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
mongo.connect("mongodb://127.0.0.1:27017/nameDB");
const playerSchema = mongo.Schema({
  username: String,
  nickname: String,
  gender: String,
  age: Number,
  category: {
    type: Array,
    default: [],
  },
  data: {
    type: Date,
    default: Date.now(),
  }
});

module.exports = mongo.model("DB", playerSchema);
