import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";

class MessageController {
  async getMessage(req: Request, res: Response) {
    try {
      const messages = await prisma.chat.findMany({
        select: {
          user: {
            select: {
              id: true,
              username: true,
            },
          },
          id: true,
          desc: true,
        },
        take: 15,
        orderBy: {
          created_at: "desc",
        },
      });
      return res.send(messages);
    } catch (err) {
      return res
        .status(500)
        .send({ msg: "Something went wrong please try again later" });
    }
  }
}

export default MessageController;
