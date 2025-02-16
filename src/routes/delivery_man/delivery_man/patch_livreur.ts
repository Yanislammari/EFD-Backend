import { Request, Response, Application } from "express";
import { createVerifyTokenMiddleware } from "../../../middleware";
import { Deliver } from "../../../models";
import bcrypt from "bcrypt";
import { isVerifyMiddleware } from "../../../middleware/isVerify";

export const adminPatchLivreur = (app: Application) => {
  app.patch("/admin/delivery_man/:id", createVerifyTokenMiddleware(), isVerifyMiddleware(), async (req: Request, res: Response) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const id = req.params.id;
      const email = req.body.email;
      const password = await bcrypt.hash(req.body.password, salt);
      const phone = req.body.phone;
      const firstName = req.body.first_name;
      const name = req.body.name;

      const deliveryMan = await Deliver.findByPk(id);
      if(!deliveryMan) {
        res.status(404).json({ error: "Delivery Man not found" });
        return;
      }

      await deliveryMan.update({
        email: email,
        password: password,
        phone: phone,
        first_name: firstName,
        name: name
      });

      res.status(200).json(deliveryMan);
      return;
    }
    catch(err) {
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  });
};
