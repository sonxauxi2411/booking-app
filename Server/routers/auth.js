const express = require("express");
const authController = require("../controllers/auth");

const router = express.Router();

router.post("/register", authController.registerUser);

router.post("/login", authController.loginUser);

router.post("/admin/login", authController.adminLogin);

module.exports = router;
