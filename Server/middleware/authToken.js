const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        res.status(403).json({ message: "Invalid token" });
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "you are not authenticated" });
  }
};
module.exports = verifyToken;
