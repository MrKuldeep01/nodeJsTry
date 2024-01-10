var express = require("express");
var router = express.Router();
const playerModel = require("./users");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Mr developer" });
});

router.get("/c", async (req, res) => {
  try {
    let user = await playerModel.create({
      username: "nope",
      nickname: "pandatji",
      gender: "m",
      age: 25,
      category: ["friend", "bca monitor", "great"],
    });
    console.log(user);
    res.send(`Successfully created user. Check the terminal for details.`);
  } catch (error) {
    console.info("Error creating user:", error);
    res.send("Internal Server Error");
  }
});
router.get("/find", async (req, res) => {
// _______________all enteries are :
let alluser = await playerModel.find();
  // ______________perform case-insensitive search
  let regExp = new RegExp("^aJAy$", "i");
  let caseInsensitive = await playerModel.find({ username: regExp });
  //  res.send(``)
  // _______________find particular array items in from collection
  // even spacing included !....
  let arrayItem = await playerModel.find({ category: { $all: ["bca"] } });
  // res.send(` `)
  // ________________find the entery that are created between given dates
  let datea = new Date("2024-01-10");
  let dateb = new Date("2024-01-11");
  let timeSearch = await playerModel.find({
    data: { $gte: datea, $lte: dateb },
  });
  // res.send(``)
  //_________________find the enteries that are having a particular field either filled or null
  let isTrue = await playerModel.find({
    category: { $exists: true },
  });
  // res.send(``)

  //_________________filter the enteries based on a given fildes length in mongoose 😊
  let findOnLen = await playerModel.find({
    $expr: {
      $and: [
        { $gte: [{ $strLenCP: "$username" }, 2] },
        { $lte: [{ $strLenCP: "$username" }, 8] },
      ],
    },
  });

  let ageLen = await playerModel.find({ age: { $gte: 20, $lte: 22 } });
  res.send(`Our all data enteries are these : <b><pre> ${alluser}</pre></b><br> 
  after case- insensitive search: <b> <pre> ${caseInsensitive}</pre> </b><br>
  after  searching 'bca' item in category field : <b> <pre> ${arrayItem}</pre> </b><br>
  after searching enteries created between date 1 to date 2 : <b> <pre> ${timeSearch}</pre></b> <br>
  after finding the enteries that are having a category field either filled or null : <b> <pre> ${isTrue}</pre></b>
  <br>after searching a string length from one point to another in username :<b> <pre> ${findOnLen}</pre> </b><br>
  after searching the age between 20 to 22 : <b> <pre> ${ageLen}</pre> </b><br>`);
});

module.exports = router;
