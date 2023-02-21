const express = require("express");
const app = express();
const cors = require("cors");
//hỗ trợ kết nối .env khi config
const dotenv = require("dotenv");

const hotelRouter = require("./routers/hotel");
const authRouter = require("./routers/auth");
const userRouter = require("./routers/user");
const roomRouter = require("./routers/room");
const transactionRouter = require("./routers/transaction");

const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

dotenv.config();

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/hotel", hotelRouter);
app.use("/api/room", roomRouter);
app.use("/api/transaction", transactionRouter);

mongoose.set("strictQuery", false);

const connect = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw error;
  }
};

app.listen(process.env.PORT || 5000, () => {
  connect();
  console.log("connect to server");
});
