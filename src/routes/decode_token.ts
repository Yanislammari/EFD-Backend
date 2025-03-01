import { Application, Request, Response } from "express";
import { createVerifyTokenMiddleware, tokenText } from "../middleware";

export const decodeToken = (app: Application) => {
  app.get("/decode-token", createVerifyTokenMiddleware(), async (req: Request, res: Response) => {
    try {
      const userId = req[tokenText]?.id;
      if(!userId) {
        res.status(404).json({ error: "User id not found" })
        return;
      }

      res.status(200).json({userId});
      return;
    }
    catch(err) {
      res.status(500).send({ message: "Internal server error" });
      return;
    }
  });
};
