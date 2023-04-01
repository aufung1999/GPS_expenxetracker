const express = require("express");
const {
  uploadLocation,
  removeLocation,
  getLocations,
  storeExpense,
} = require("../controllers/locations");

const router = express.Router();

//POST
router.post("/store-location", uploadLocation);
router.post("/remove-location", removeLocation);
router.post("/locations", getLocations);
router.post("/store-expense", storeExpense);
//GET

module.exports = router;
