const SegmentWheelModel = require("../models/SegmentWheel");

module.exports.segmentWheel_get_all = async (req, res) => {
  try {
    const segments = await SegmentWheelModel.find(
      {},
      {
        strokeStyle: 1,
        text: 1,
        fillStyle: 1,
        gift_number: 1,
        textFillStyle: 1,
      }
    );
    if (segments.length === 0) {
      return res
        .status(200)
        .json({ success: true, msg: "You have no segments" });
    }
    return res.status(200).json({ success: true, data: segments });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

// getting single segment for gift_number
module.exports.single_gift_segment = async (req, res) => {
  try {
    const paramsText = req.params.text;
    const SingleSegment = await SegmentWheelModel.find({ text: paramsText });
    // console.log(SingleWorkOut);
    if (!SingleSegment) {
      return res.status(404).json({ error: "No such segment" });
    }
    res
      .status(200)
      .json({ success: true, gift_number: SingleSegment[0].gift_number });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

// getting a single segment based on text field

module.exports.single_get_segment = async (req, res) => {
  try {
    const paramsText = req.params.text;
    const SingleSegment = await SegmentWheelModel.find({ text: paramsText });
    // console.log(SingleWorkOut);
    if (!SingleSegment) {
      return res.status(404).json({ error: "No such segment" });
    }
    res.status(200).json({ success: true, SingleSegment });
  } catch (err) {

    res.status(400).json({ error: err.message });
  }
};

// updating the field in segment

module.exports.segment_update = async (req, res) => {
  //   res.json({ msg: "Update workout" });

  try {
    const paramsText = req.params.text;
    const updatedValue = req.body;
    // if (!mongoose.Types.ObjectId.isValid(paramsText)) {
    //   return res.status(404).json({ error: "No such workout" });
    // }
    const updatedSegment = await SegmentWheelModel.findOneAndUpdate(
      { text: paramsText },
      updatedValue,
      { new: true }
    );

    if (!updatedSegment) {
      return res.status(404).json({ error: "No such segment" });
    }

    res.status(204).json({ success: true, updatedSegment });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};