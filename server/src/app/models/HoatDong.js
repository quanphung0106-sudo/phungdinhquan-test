const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HoatDongSchema = new Schema(
  {
    tenHD: {
      type: String,
      required: true,
    },
    moTaHD: {
      type: String,
      required: true,
    },
    ngayGioBD: {
      type: Date,
      required: true,
    },
    ngayGioKT: {
      type: Date,
      required: true,
    },
    slToiThieuYC: {
      type: Number,
      required: true,
    },
    slToiDaYC: {
      type: Number,
      required: true,
    },
    trangThai: {
      type: Number,
      default: 0,
      required: true,
    },
    lyDoHuyHD: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.HoatDong || mongoose.model("HoatDong", HoatDongSchema);
