import { Request, Response, Application } from "express";
import { createVerifyTokenMiddleware } from "../../../middleware";
import { Deliver } from "../../../models";
import bcrypt from "bcrypt";
import { isVerifyMiddleware } from "../../../middleware/isVerify";

export const deliverPatchLivreur = (app: Application) => {
  app.patch("/delivery_man/:id", createVerifyTokenMiddleware(), isVerifyMiddleware(), async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const deliveryMan = await Deliver.findByPk(id);
      if(!deliveryMan) {
        res.status(404).json({ error: "Delivery Man not found" });
        return;
      }

      const updateData: any = {};

      if(req.body.email) {
        updateData.email = req.body.email;
      }

      if(req.body.password) {
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(req.body.password, salt);
      }

      if(req.body.phone) {
        updateData.phone = req.body.phone;
      }

      if(req.body.first_name) {
        updateData.first_name = req.body.first_name;
      }

      if(req.body.name) {
        updateData.name = req.body.name;
      }

      if(req.body.lat) {
        updateData.lat = req.body.lat;
      }

      if(req.body.lng) {
        updateData.lng = req.body.lng;
      }

      await deliveryMan.update(updateData);
      res.status(200).json(deliveryMan);
      return;
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  });
};
