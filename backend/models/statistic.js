const mongoose = require("mongoose");

const statisticSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  expense: {
    type: String,
    required: true,
  },
  place_id: {
    type: String,
    // required: true,
  },
});

module.exports = mongoose.model("Statistic", statisticSchema);
