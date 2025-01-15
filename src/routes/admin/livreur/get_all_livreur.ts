import { Application, Request, Response } from "express";
import { Deliver } from "../../../models";

export const adminGetAllLivreur = (app : Application)=>{
  app.get('/admin/delivery_man', async (req : Request, res : Response) => {
    try {
      const delivers = await Deliver.findAll();
      res.status(200).json(delivers);
      return;
    } 
    catch (err) {
      res.status(500).send({ message: "Internal server error" });
      return;
    }
  });
}