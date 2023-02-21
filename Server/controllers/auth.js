const User = require("../models/User");
//mã hóa password
const bcrypt = require("bcrypt");
//jwt token
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    //check email
    const emailCheck = await User.findOne({ email: req.body.email });
    if (emailCheck) {
      return res.status(400).json({ message: "Email already exists" });
    } else {
      //salt password 10
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      //register user
      const newUser = new User({
        userName: req.body.userName,
        fullName: req.body.fullName,
        email: req.body.email,
        password: hashedPassword,
        phoneNumber: req.body.phoneNumber,
      });
      const user = await newUser.save();
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.loginUser = async (req, res) => {
  try {
    //find user
    const user = await User.findOne({
      email: req.body.email,
    });
    //check user
    if (!user) {
      res.status(400).json({ message: "User not found" });
    } else {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      ); //check pasword
      if (!validPassword) {
        res.status(401).json({ message: "wrong password" });
      }
      //check user && password
      if (user && validPassword) {
        //accessToken
        const token = jwt.sign(
          { id: user._id, admin: user.isAdmin },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        //loại password
        const { password, ...orther } = user._doc;
        res.status(200).json({ orther, token });
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//check Admin

exports.adminLogin = async (req, res) => {
  try {
    //find user
    const user = await User.findOne({
      email: req.body.email,
    });
    //check user
    if (!user) {
      res.status(400).json({ message: "User not found" });
    } else {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      ); //check pasword
      if (!validPassword) {
        res.status(401).json({ message: "wrong password" });
      } else {
        if (user && validPassword) {
          //loại password
          const { password, ...orther } = user._doc;
          console.log(orther);

          if (!orther.isAdmin) {
            return res.status(402).json({ message: "not Admin" });
          } else {
            //accessToken
            const token = jwt.sign(
              { id: user._id, admin: user.isAdmin },
              process.env.JWT_SECRET,
              { expiresIn: "1h" }
            );

            res.status(200).json({ orther, token });
          }
        }
      }
    }
  } catch (error) {}
};
