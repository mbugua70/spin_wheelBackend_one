const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Defining out Schema structure.

const segmentWheelSchema = new Schema(
  {
    fillStyle: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    gift_number: {
      type: Number,
      required: true,
    },
    strokeStyle: {
      type: String,
    },
    textFillStyle: {
      type: String,
    },
  },
  { timestamps: true }
);

const SegmentWheelModel = mongoose.model("segment_wheels", segmentWheelSchema);
module.exports = SegmentWheelModel;
