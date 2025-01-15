import { Application, Request, Response } from "express";
import { Adress, Colis } from "../../../models";

export const adminGetAllColis = (app : Application)=>{
  app.get('/admin/colis', async (req : Request, res : Response) => {
    try {
      const colis = await Colis.findAll({
        include:[
          {
            as: 'adress',
            model : Adress,
          }
        ]
      });
      res.status(200).json(colis);
      return;
    } 
    catch (err) {
      res.status(500).send({ message: "Internal server error" });
      return;
    }
  });
}