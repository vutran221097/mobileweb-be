import express from "express"

import authJwt from "../middlewares/authJwt";
import NewsController from "../controllers/news.controller";

const router = express.Router();

router.post(
  "/",
  [authJwt.verifyToken, authJwt.isModerator],
  NewsController.create
);

router.get("/", NewsController.findAllAndPagination);
router.get("/:id", NewsController.findOne);

router.put(
  "/:id",
  [authJwt.verifyToken, authJwt.isModerator],
  NewsController.update
);

router.delete(
  "/:id",
  [authJwt.verifyToken, authJwt.isModerator],
  NewsController.delete
);

router.delete(
  "/",
  [authJwt.verifyToken, authJwt.isModerator],
  NewsController.deleteAll
);

export default router;
