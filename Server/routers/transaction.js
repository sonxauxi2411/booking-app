const router = require("express").Router();
const transactionController = require("../controllers/transaction");

router.post("/", transactionController.postTransaction);
router.get("/all", transactionController.transactionAll);
router.get("/user/:id", transactionController.transactionFindUser);
router.get("/earnings", transactionController.earningsTransaction);
router.get("/avgmonth", transactionController.avgPriceTransaction);
router.get("/hotel/", transactionController.transactionTest);

module.exports = router;
