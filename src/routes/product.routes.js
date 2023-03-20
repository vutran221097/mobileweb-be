import express from "express";
import path from "path";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

import authJwt from "../middlewares/authJwt";
import ProductController from "../controllers/product.controller";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    const image = uuidv4() + "-" + Date.now() + path.extname(file.originalname);
    cb(null, image);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({
  storage: storage,
  limits: 1024 * 1024 * 5,
  fileFilter: fileFilter,
});

router.post(
  "/",
  [authJwt.verifyToken, authJwt.isModerator],
  upload.single("image"),
  ProductController.create
);

router.get("/", ProductController.findAllAndPagination);
router.get("/:id", ProductController.findOne);

router.put(
  "/:id",
  [authJwt.verifyToken, authJwt.isModerator],
  upload.single("image"),
  ProductController.update
);

router.delete(
  "/:id",
  [authJwt.verifyToken, authJwt.isModerator],
  ProductController.delete
);

router.delete(
  "/",
  [authJwt.verifyToken, authJwt.isModerator],
  ProductController.deleteAll
);

export default router
