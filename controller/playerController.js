const PlayerModel = require("../models/players");
const mongoose = require("mongoose");

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { player_email: "", player_phone: "", player_marchandize: "" };

  // validation errors
  if (err.message.includes("player validation failed")) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

module.exports.playerForm_post = async (req, res) => {
  const { player_email, player_phone, player_marchandize } = req.body;

  try {
    const player_id = await PlayerModel.create({
      player_email,
      player_phone,
      player_marchandize,
    });

    if (player_id) {
      res.status(200).json({ success: true, id: player_id._id });
    }
  } catch (err) {
     if (err.code === 11000) {
       return res
         .status(400)
         .json({ error: "The player has already participated" });
     }
    const error = handleErrors(err);
    res.status(400).json({ error });
  }
};

// updating the marchandize for player

module.exports.player_gift_update = async (req, res) => {
  try {
    const paramsID = req.params.id;
    const updatedValue = req.body;
    if (!mongoose.Types.ObjectId.isValid(paramsID)) {
      return res.status(404).json({ error: "No such player" });
    }
    const giftUpdated = await PlayerModel.findByIdAndUpdate(
       paramsID ,
      updatedValue,
      { new: true }
    );

    if (!giftUpdated) {
      return res.status(404).json({ error: "No such player" });
    }

    res.status(204).json({ success: true, giftUpdated });
  } catch (err) {

    res.status(400).json({ error: err.message });
  }
};
