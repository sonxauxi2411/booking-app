const Hotel = require("../models/hotel");
const Room = require("../models/room");
const Transaction = require("../models/Transaction");

//all hotels
exports.allHotel = async (req, res) => {
  try {
    // console.log(1);
    const hotels = await Hotel.find({});
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json(error);
  }
};

//count hotel city
exports.countHotel = async (req, res) => {
  try {
    //aggerate để tính count
    const countHotels = await Hotel.aggregate([
      {
        //count hotel city _id
        $group: {
          _id: "$city",
          countHotels: { $sum: 1 },
        },
      },
      //ref
      {
        $project: {
          _id: "$city",
          countHotels: 1,
          city: "$_id",
        },
      },
    ]);

    res.status(200).json(countHotels);
  } catch (error) {
    res.status(500).json(error);
  }
};

//hotel type
exports.typeHotel = async (req, res) => {
  try {
    //aggerate sum type hotel
    const typeHotel = await Hotel.aggregate([
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 },
        },
      },
      //ref
      {
        $project: {
          _id: "$type",
          count: 1,
          type: "$_id",
        },
      },
    ]);
    return res.status(200).json(typeHotel);
  } catch (error) {
    res.status(500).json(error);
  }
};
//top rating hotel
exports.topRating = async (req, res) => {
  try {
    const typeHotel = await Hotel.aggregate([
      {
        $sort: { rating: -1 },
      },
      {
        $limit: 3,
      },
    ]);

    return res.status(200).json(typeHotel);
  } catch (error) {
    res.status(500).json(error);
  }
};

//search hotels by query
exports.searchHotel = async (req, res) => {
  try {
    const city = req.query.city;
    const min = req.query.min || 0;
    const max = req.query.max || 9999;
    //console.log(city.toLocaleLowerCase());

    //rỗng search all
    if (!city) {
      const hotels = await Hotel.find();
      return res.status(200).json(hotels);
    } else {
      //sự dụng regex + options(i) để tìm kiếm theo query
      const findHotel = await Hotel.find({
        city: { $regex: city, $options: "i" },
        //check price hotels
        cheapestPrice: { $gt: Number(min), $lt: Number(max) },
      });
      if (findHotel.length === 0) {
        //not found hotel
        return res.status(404).json({ message: "not found hotel" });
      } else {
        return res.status(200).json(findHotel);
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//hotel by Id
exports.getHotelById = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id);

    if (!id) {
      res.status(404).json({ message: "not found params" });
    } else {
      //console.log(id);
      const hotel = await Hotel.findById(id).exec();

      if (hotel.length === 0) {
        res.status(404).json({ message: "not found hotel" });
      } else {
        return res.status(200).json(hotel);
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//danh sách room từ id hotel
exports.getHotelRooms = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const listRoom = await Room.find({
      _id: { $in: hotel.rooms },
    });
    res.status(200).json(listRoom);
  } catch (error) {
    res.status(500).json(error);
  }
};

//xóa hotel id
exports.deleteHotelById = async (req, res) => {
  try {
    const hotelId = await req.params.id;
    //tìm có transaction hay không
    const transaction = await Transaction.find({ hotel: hotelId });

    if (transaction.length !== 0) {
      //có trả về message
      return res.status(404).json({ message: "This hotel has transaction" });
    } else {
      //không thì xóa
      await Hotel.findByIdAndDelete(hotelId);
      return res.status(200).json({ message: "hotel deleted" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
//add hotel
exports.addHotel = async (req, res) => {
  try {
    //console.log(req.body);

    //tạo hotel
    const newHotel = new Hotel(req.body);
    //  console.log(newHotel);
    const saveHotel = await newHotel.save();
    return res.status(200).json(saveHotel);
  } catch (error) {
    res.status(500).json(error);
  }
};

//update Hotel

exports.updateHotel = async (req, res) => {
  try {
    const id = req.params.id;
    const updateHotel = await Hotel.findByIdAndUpdate(id, {
      $set: req.body,
    });
    return res.status(200).json(updateHotel);
  } catch (error) {
    return res.status(500).json(error);
  }
};
