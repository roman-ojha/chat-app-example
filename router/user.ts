import express from "express";
import { prisma } from "../config/prisma.js";
import UserController from "../controller/userController.js";

const router = express.Router();
const controller = new UserController();

router.post("/", controller.createUser);
router.get("/check/:username", controller.checkUser);

export default router;
