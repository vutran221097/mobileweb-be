import express from "express"
import authJwt from "../middlewares/authJwt";
import OrderController from "../controllers/order.controller";

const router = express.Router();

router.post("/", OrderController.create);
router.get("/", OrderController.findAllAndPagination);

router.get("/:id", OrderController.findOne);
router.get("/phone/:phone", OrderController.findByPhoneNum);

router.put(
  "/:id",
  [authJwt.verifyToken, authJwt.isModerator],
  OrderController.update
);

router.delete(
  "/:id",
  [authJwt.verifyToken, authJwt.isModerator],
  OrderController.delete
);

router.delete(
  "/",
  [authJwt.verifyToken, authJwt.isModerator],
  OrderController.deleteAll
);

export default router;