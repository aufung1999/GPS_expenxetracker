const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    place_id: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
      unique: true,
    },
    viewport: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    count: {
      type: String,
      required: true,
    },
  });