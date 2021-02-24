  const mongoose = require("mongoose");

  const linkSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    image: {
      type: String,
      required: true,
      min: 6,
      max: 1024,
    },
    search_text: {
      type: String,
      required: true
    },
    keywords: [{
      type: String,
      required: true,
      min: 6,
      max: 1024,
    }],
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    date: {
      type: Date,
      default: Date.now,
    }
  });

  module.exports = mongoose.model("Link", linkSchema);