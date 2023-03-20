import * as dotenv from "dotenv";
dotenv.config();
import db from "../models";
const User = db.user;

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const authController = {};

authController.signUp = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    role: req.body.role,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({
        message: err,
      });
      return;
    } else {
      return res.status(201).json({
        success: true,
        message: "New user sign up successfully",
        newUser: user,
      });
    }
  });
};

authController.signIn = (req, res) => {
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({
        message: err,
      });
      return;
    }

    if (!user) {
      return res.status(404).send({
        message: "Không tìm thấy tài khoản.",
      });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Nhập sai mật khẩu",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.SECRET_TOKEN,
      {
        expiresIn: 86400, // 24 hours
      }
    );

    res.status(200).send({
      user:{
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      accessToken: token,
    });
  });
};

export default authController;
