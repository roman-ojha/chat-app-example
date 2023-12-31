import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const { username } = req.body;
      if (!username) {
        return res.status(400).send({ msg: "Username is required" });
      }
      const checkUser = await prisma.user.findFirst({
        where: { username: username },
      });
      if (checkUser) {
        return res
          .status(400)
          .send({ msg: "Username already exist please use another one" });
      }
      const resUser = await prisma.user.create({
        data: { username: username },
      });
      return res.send({ username: resUser.username });
    } catch (err) {
      return res
        .status(500)
        .send({ msg: "Something went wrong please try again later" });
    }
  }

  async checkUser(req: Request, res: Response) {
    try {
      const isUser = await prisma.user.findFirst({
        where: {
          username: req.params.username,
        },
        select: {
          id: true,
          username: true,
        },
      });
      if (!isUser) {
        return res.status(400).send({ msg: "UnAuthorized User" });
      }
      return res.send(isUser);
    } catch (err) {
      return res
        .status(500)
        .send({ msg: "Something went wrong please try again later" });
    }
  }
}

export default UserController;
