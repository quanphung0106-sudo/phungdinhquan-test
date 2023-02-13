const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ThanhVienSchema = new Schema(
  {
    hoTen: {
      type: String,
    },
    gioiTinh: {
      type: Boolean,
    },
    ngaySinh: {
      type: Date,
    },
    email: {
      type: String,
    },
    dienThoai: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.ThanhVien || mongoose.model("ThanhVien", ThanhVienSchema);
