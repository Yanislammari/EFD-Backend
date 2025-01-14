import { Application, Request, Response } from "express";
import bcrypt from "bcrypt";
import { Deliver } from "../../../models";
import jwt from "jsonwebtoken";
import { keyToken } from "../../../utils";


export const niqueTaMereDeliveryMan = (app : Application)=>{
  app.post('/deliveryman/login', async (req : Request, res : Response) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const valeur = await Deliver.findOne({ where: { email } });

      if (!valeur || !(await bcrypt.compare(password, valeur.password))) {
        res.status(401).json({ message: "Mail or password is incorrect" });
        return;
      }

      const token = jwt.sign({ id: valeur.uuid }, keyToken, { expiresIn: '1h' });
      res.status(200).send({ message: "Success connect", token: token });
      return;
    } 
    catch (err) {
      res.status(500).send({ message: "Internal server error" });
      return;
    }
  });
}
