import { Application, Request,Response } from "express";
import bcrypt from "bcrypt";
import { Deliver } from "../../../models";
import jwt from "jsonwebtoken";
import { keyToken } from "../../../utils";

export const registerDeliveryMan = (app : Application)=>{
  app.post('/deliveryman/register', async (req : Request, res : Response) => {
    try{
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
      const delivreyMan = await Deliver.create(req.body);
      const token = jwt.sign({ id: delivreyMan.uuid }, keyToken, { expiresIn: '1h' });
      res.status(200).send({message : "Success register",token: token});
    } 
    catch(err){
      console.log(err);
      res.status(500).send({message: "Internal server error"});
    }
  });
}
