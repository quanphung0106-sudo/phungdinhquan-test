const HoatDong = require("../models/HoatDong");
const ThanhVien = require("../models/ThanhVien");

//[POST]: /api/hoat-dong
const createNewHoatDong = async (req, res) => {
  try {
    const hoatDong = await HoatDong.create(req.body);
    return res.status(201).json(hoatDong);
  } catch (err) {
    return res.status(500).json(err);
  }
};

//[GET]: /api/hoat-dong
const getAllHoatDong = async (req, res) => {
  try {
    const hoatDong = await HoatDong.find({});
    return res.status(200).json(hoatDong);
  } catch (err) {
    return res.status(500).json(err);
  }
};

//[GET]: /api/hoat-dong/:id
const getHoatDong = async (req, res) => {
  try {
    const hoatDong = await HoatDong.findById({ _id: req.params.id });
    if (!hoatDong) {
      return res.status(404).json("Lỗi");
    } else {
      return res.status(200).json(hoatDong);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

//update hoat dong
//[PUT]: /api/hoat-dong/:id
const updateHoatDong = async (req, res) => {
  try {
    const hoatDong = await HoatDong.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    return res.status(200).json(hoatDong);
  } catch (err) {
    return res.status(500).json(err);
  }
};

//delete hoat dong
//[DELETE]: /api/hoat-dong/:id
const deleteHoatDong = async (req, res) => {
  try {
    await HoatDong.findByIdAndDelete(req.params.id);
    return res.status(200).json("hoat dong da duoc xoa");
  } catch (err) {
    return res.status(500).json(err);
  }
};

const thongKeDiemTrungBinh = async () => {
  const results = await ThanhVien.aggregate([
    {
      $addFields: { _id: { $toString: "$_id" } },
    },
    {
      $lookup: {
        from: ThamGia.collection.name,
        localField: "_id",
        foreignField: "_id",
        as: "danhSachDiem",
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [{ $arrayElemAt: ["$danhSachDiem", 0] }, "$$ROOT"],
        },
      },
    },
    {
      $project: {
        MaTV: 1,
        HoTen: 1,
        DiemDanhGiaTrungBinh: { $avg: "$danhSachDiem" },
      },
    },
    {
      $sort: {
        DiemTruongDoan: -1,
      },
    },
  ]);
  return results;
};

module.exports = {
  createNewHoatDong,
  getAllHoatDong,
  updateHoatDong,
  getHoatDong,
  deleteHoatDong,
  thongKeDiemTrungBinh,
};
