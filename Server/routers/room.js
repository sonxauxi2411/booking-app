const router = require("express").Router();
const roomController = require("../controllers/room");

router.get("/all", roomController.getRooms);

//router.get("/:id", roomController.getRoomById);
router.post("/:hotelId", roomController.addRoom);

router.delete("/:id", roomController.deleteRoom);

router.put("/:id", roomController.updateRoom);

module.exports = router;
