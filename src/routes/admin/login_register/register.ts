import { Application, Request,Response } from "express";
import bcrypt from "bcrypt";
import { Admin } from "../../../models";
import jwt from "jsonwebtoken";
import { keyToken } from "../../../utils";

export const registerAdmin = (app : Application)=>{
  app.post('/admin/register', async (req : Request, res : Response) => {
    try{
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
      const admin = await Admin.create(req.body);
      const token = jwt.sign({ id: admin.uuid }, keyToken, { expiresIn: '1h' });
      res.status(200).send({message : "Success register",token: token});
    } 
    catch(err){
      console.log(err);
      res.status(500).send({message: "Internal server error"});
    }
  });
}
