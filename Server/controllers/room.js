const Room = require("../models/room");
const Hotel = require("../models/hotel");
const Transaction = require("../models/Transaction");

//all rooms
exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).send(error);
  }
};

//add room
exports.addRoom = async (req, res) => {
  try {
    //room
    const newRoom = new Room(req.body);
    //hotel id
    const hotelId = await req.body.hotelId;
    //add room
    const saveRoom = await newRoom.save();
    //update room  hotel
    await Hotel.findByIdAndUpdate(hotelId, {
      //update idRoom
      $push: { rooms: saveRoom._id },
    });
    res.status(200).json(saveRoom);
  } catch (error) {
    res.status(500).send(error);
  }
};

//detele room
exports.deleteRoom = async (req, res) => {
  try {
    const id = await req.params.id;
    //tìm hotel theo room id
    const hotel = await Hotel.find({ rooms: id });

    //ko có thì xóa

    if (hotel.length === 0) {
      await Room.findByIdAndDelete(id);
      return res.status(200).json({ message: "Room deleted" });
    }
    //else {
    //   //kiểm tra trong transaction

    const hotelId = hotel.map((hotel) => hotel._id.toString());
    // console.log(hotelId);

    const transaction = await Transaction.find({
      hotel: hotelId,
    });
    //console.log(transaction);

    if (transaction.length > 0) {
      return res.status(404).json({ message: "This room has transaction" });
    } else {
      await Room.findByIdAndDelete(id);
      return res.status(200).json({ message: "Room deleted" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//update room
exports.updateRoom = async (req, res) => {
  try {
    const id = await req.params.id;

    const updateRoom = await Room.findByIdAndUpdate(id, {
      $set: req.body,
    });
    res.status(200).json(updateRoom);
  } catch (error) {
    res.status(500).json(error);
  }
};
