const express = require("express");
const { uploadLocation, getLocations } = require("../controllers/locations");

const router = express.Router();

//POST
router.post("/store-location", uploadLocation);
router.post("/locations", getLocations);

//GET

module.exports = router;
