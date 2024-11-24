const { Router } = require("express");
const router = Router();
const Playercontroller = require("../controller/playerController");

router.post("/api/player", Playercontroller.playerForm_post);

// gift update
router.patch("/api/playerupdate/:id", Playercontroller.player_gift_update);

module.exports = router;
