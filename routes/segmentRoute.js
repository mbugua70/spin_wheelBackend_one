const { Router } = require("express");
const router = Router();
const Authcontroller = require("../controller/authController");

router.get("/api/segments", Authcontroller.segmentWheel_get_all);

router.get("/api/segment/:text", Authcontroller.single_get_segment);

router.patch("/api/segment/:text", Authcontroller.segment_update);

router.get("/api/gift_number/:text", Authcontroller.single_gift_segment);

module.exports = router;
