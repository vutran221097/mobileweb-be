
import express from "express"

import authJwt from '../middlewares/authJwt'
import userController from "../controllers/user.controller"

const router = express.Router()

router.post("/", authJwt.verifyToken, userController.create);

router.get("/", authJwt.verifyToken, userController.findAll);

router.get("/:id", authJwt.verifyToken, userController.findOne);

router.put("/:id", authJwt.verifyToken, userController.update);

router.put("/change-password/:id", userController.changePassword);

router.delete("/:id", authJwt.verifyToken, userController.deleteOne);

router.delete("/", authJwt.verifyToken, userController.deleteAll);

export default router