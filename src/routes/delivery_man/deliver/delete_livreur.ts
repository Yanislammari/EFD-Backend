import { Request, Response, Application } from "express";
import { createVerifyTokenMiddleware } from "../../../middleware";
import { Deliver } from "../../../models";
import { isVerifyMiddleware } from "../../../middleware/isVerify";

export const deliverDeleteLivreur = (app: Application) => {
  app.delete("/admin/delivery_man/:id", createVerifyTokenMiddleware(), isVerifyMiddleware(), async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const deliveryMan = await Deliver.findByPk(id);
      if(!deliveryMan) {
        res.status(404).json({ error: "Delivery Man not found" });
        return;
      }

      deliveryMan.destroy();
      res.status(200).json({ message: "Delivery Man deleted" });
      return;
    }
    catch(err) {
      res.status(500).send({ message: "Internal server error" });
      return;
    }
  });
};
