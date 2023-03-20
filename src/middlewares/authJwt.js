import * as dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const authJwt = {};

authJwt.verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

authJwt.isAdmin = async (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user.role === "admin") {
      next();
      return;
    }

    res.status(403).send({ message: "Require Admin Role!" });
    return;
  });
};

authJwt.isModerator = async (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user.role === "moderator") {
      next();
      return;
    }

    res.status(403).send({ message: "Require Moderator Role!" });
    return;
  });
};

export default authJwt;
