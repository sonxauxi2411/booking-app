const userControllers = require("../controllers/user");
const verifyToken = require("../middleware/authToken");

const router = require("express").Router();

router.get("/", userControllers.userAll);
router.get("/:id", userControllers.userById);

module.exports = router;
