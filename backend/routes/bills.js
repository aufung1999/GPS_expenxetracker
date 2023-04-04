const express = require("express");
const { addBill, getBills, updateBills, newRoundBills } = require("../controllers/bills");

const router = express.Router();

//POST
router.post("/add-bill", addBill);
router.post("/bills", newRoundBills,updateBills, getBills);
router.post("/new-round-bills");

module.exports = router;