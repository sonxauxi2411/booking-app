const hotelControlle = require("../controllers/hotel");

const router = require("express").Router();
//all hotels
router.get("/all", hotelControlle.allHotel);

//count hotel of city
router.get("/countHotel", hotelControlle.countHotel);
//count type of hotel
router.get("/countType", hotelControlle.typeHotel);
//top rating hotel
router.get("/toprating", hotelControlle.topRating);

router.get("/search", hotelControlle.searchHotel);

router.get("/:id", hotelControlle.getHotelById);

router.get("/rooms/:id", hotelControlle.getHotelRooms);

router.delete("/:id", hotelControlle.deleteHotelById);

router.post("/add", hotelControlle.addHotel);

router.put("/:id", hotelControlle.updateHotel);

module.exports = router;
