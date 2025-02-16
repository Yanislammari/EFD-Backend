import { Request, Response, Application } from "express";
import { createVerifyTokenMiddleware } from "../../../middleware";
import { Deliver } from "../../../models";

export const adminGetLivreurById = (app: Application) => {
  app.get("/deliver/delivery_man/:id", createVerifyTokenMiddleware(), async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const deliveryMan = await Deliver.findByPk(id);
      if(!deliveryMan) {
        res.status(404).json({ error: "Delivery Man not found" });
        return;
      }

      res.status(200).json(deliveryMan);
      return;
    }
    catch(err) {
      res.status(500).send({ message: "Internal server error" });
      return;
    }
  });
};
