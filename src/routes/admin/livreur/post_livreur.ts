import { Request, Response, Application } from "express";
import { createVerifyTokenMiddleware } from "../../../middleware";
import { isAdminMiddleware } from "../../../middleware/isAdmin";
import { Deliver } from "../../../models";
import bcrypt from "bcrypt";

export const adminPostLivreur = (app: Application) => {
  app.post("/admin/delivery_man/", createVerifyTokenMiddleware(), isAdminMiddleware(), async (req: Request, res: Response) => {
    try {
      const { first_name, name, phone, email, password, lat, lng } = req.body;

      if (!first_name || !name || !phone || !email || !password) {
        res.status(400).json({ error: "Missing required fields" });
        return;
      }

      const existingDeliveryMan = await Deliver.findOne({ where: { email } });
      if (existingDeliveryMan) {
        res.status(409).json({ error: "Email already exists" });
        return;
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newDeliver = await Deliver.create({
        first_name,
        name,
        phone,
        email,
        password: hashedPassword,
        lat: lat || null,
        lng: lng || null,
        status: "pending"
      });

      res.status(201).json(newDeliver);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};
