const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ThamGiaSchema = new Schema(
  {
    ngayGioDK: {
      type: Date,
    },
    diemTruongDoan: {
      type: Number,
    },
    diemTieuChi1: {
      type: Number,
    },
    diemTieuChi2: {
      type: Number,
    },
    diemTieuChi3: {
      type: Number,
    },
    nhanXetKhac: {
      type: String,
    },
    // maTV: {
    //   type: mongoose.SchemaType.ObjectId,
    //   ref: "ThanhVien",
    // },
    // maTV: {
    //   type: mongoose.SchemaType.ObjectId,
    //   ref: "ThanhVien",
    // },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.ThamGia || mongoose.model("ThamGia", ThamGiaSchema);
