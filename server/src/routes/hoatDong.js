const express = require("express");
const router = express.Router();
const HoatDongController = require("../app/controllers/HoatDongController");

router.post("/", HoatDongController.createNewHoatDong);
router.get("/", HoatDongController.getAllHoatDong);
router.put("/:id", HoatDongController.updateHoatDong);

module.exports = router;
