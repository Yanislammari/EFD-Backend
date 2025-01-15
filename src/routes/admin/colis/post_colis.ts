import { Application, Request, Response } from "express";
import { Adress, Colis } from "../../../models";

export const adminPostColis = (app : Application)=>{
  app.post('/admin/colis', async (req : Request, res : Response) => {
    try {
      if(!req.body.adress){
        const colis = await Colis.create(req.body.colis);
        res.status(200).json({message : "Colis created successfully"});
        return;
      }
      const adress = await Adress.create(req.body.adress);
      req.body.colis.adress_id = adress.uuid;
      const colis = await Colis.create(req.body.colis);
      res.status(200).json({message : "Colis created successfully"});
      return;
    } 
    catch (err) {
      res.status(500).send({ message: "Internal server error" });
      return;
    }
  });
}