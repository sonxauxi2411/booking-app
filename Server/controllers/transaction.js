const Hotel = require("../models/hotel");
const Transaction = require("../models/Transaction");
const Room = require("../models/room");

//add transaction
exports.postTransaction = async (req, res) => {
  try {
    const { userId, hotelId, rooms, dateEnd, dateStart, price, payment } =
      req.body;

    const newTransaction = await new Transaction({
      user: userId,
      hotel: hotelId,
      room: rooms,
      dateStart: dateStart,
      dateEnd: dateEnd,
      price: price,
      payment: payment,
      status: "Booked",
    });
    // console.log(newTransaction);
    await newTransaction.save();
    res.status(200).json("success");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//find transation userId
exports.transactionFindUser = async (req, res) => {
  try {
    const userId = await req.params.id;
    const transacts = await Transaction.find({ user: userId });
    return res.status(200).json(transacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//all transaction
exports.transactionAll = async (req, res) => {
  try {
    const pageSize = 8;
    const pegeNumber = Number(req.query.page) || 1;

    const transacts = await Transaction.find()
      //skip lấy phân tử tiếp theo theo pageNumber
      .skip((pegeNumber - 1) * pageSize)
      //limit :lấy tối đa pageSize
      .limit(pageSize);
    return res.status(200).json({
      result: transacts,
      page: pegeNumber,
      //tổng trang
      totalPage: Math.ceil(transacts.length / pageSize),
      totalTransaction: transacts.length,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//total earningTransaction
exports.earningsTransaction = async (req, res) => {
  try {
    //aggregate + $sum để tính total
    const sumPrice = await Transaction.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: "$price",
          },
        },
      },
    ]);
    return res.status(200).json(sumPrice);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//total trung bình hàng tháng
exports.avgPriceTransaction = async (req, res) => {
  // tháng hiện tại
  const currentMonth = new Date().getMonth() + 1;
  // năm hiện tại
  const currentYear = new Date().getFullYear();
  try {
    const transactionMonth = await Transaction.aggregate([
      {
        $match: {
          //tìm transaction trong tháng
          createdAt: {
            $gte: new Date(currentYear, currentMonth - 1, 1),
            $lt: new Date(currentYear, currentMonth, 1),
          },
        },
      },
      {
        //tính avg transaction price
        $group: {
          _id: null,
          total: { $avg: "$price" },
          transactionCount: { $sum: 1 },
        },
      },
    ]);

    return res.status(200).json(transactionMonth);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//transaction find hotel ID
exports.hotelTransaction = async (req, res) => {
  try {
    const hotelId = req.params.id;
    // console.log(hotelId);
    const transactionHotelId = await Transaction.find({ hotel: hotelId });
    console.log(transactionHotelId);

    res.status(200).json(transactionHotelId);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//check room transation date
exports.transactionTest = async (req, res) => {
  const id = req.query.id; //id của hotel
  //dateStart kiểm tra
  const dateStart = new Date(req.query.dateStart).getTime();
  //dateEnd kiểm tra
  const dateEnd = new Date(req.query.dateEnd).getTime();

  try {
    //transaction find hotel ID
    const trans = await Transaction.find({ hotel: id });
    //hotel find id
    const hotel = await Hotel.findById(id);
    //room find hotel id
    const rooms = await Room.find({ _id: { $in: hotel.rooms } });
    //lấy roomNumbers
    const dataRooms = rooms.map((r) => {
      return {
        room_id: r._id,
        result: (r.roomNumbers = r.roomNumbers.map((rn) => {
          return {
            //từ roomNumber tạo ra 1 Array với available true:trống/false:đã đặt
            roomNumber: rn,
            available: !trans.find((t) => {
              //sự dụng transaction tìm được để kiểm tra id với roomNumber
              const h = t.room.find((tr) => {
                // console.log(tr.roomNumbers);
                return (
                  tr.roomNumbers.includes(rn.toString()) &&
                  tr.room_id.toString() === r._id.toString() &&
                  //kiểm tra date
                  //dateStart dateEnd : ngày chuẩn bị đặt
                  //t.dateStart t.dateEnd : ngầy đã đặt
                  ((dateStart >= t.dateStart.getTime() &&
                    dateStart <= t.dateEnd.getTime()) ||
                    (dateEnd <= t.dateEnd.getTime() &&
                      dateEnd >= t.dateStart.getTime()))
                );
              });
              //console.log(h);
              return h;
            }),
          };
        })),
      };
    });
    res.status(200).send({ dataRooms });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
