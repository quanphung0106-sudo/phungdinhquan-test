const express = require("express");
const router = express.Router();
const HoatDongController = require("../app/controllers/HoatDongController");

router.post("/", HoatDongController.createNewHoatDong);
router.get("/", HoatDongController.getAllHoatDong);
router.get("/:id", HoatDongController.getHoatDong);
router.put("/:id", HoatDongController.updateHoatDong);
router.delete("/:id", HoatDongController.deleteHoatDong);
router.get("/trungbinh", HoatDongController.thongKeDiemTrungBinh);

module.exports = router;
