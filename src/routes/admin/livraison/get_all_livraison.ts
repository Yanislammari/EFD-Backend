import { Application, Request, Response } from "express";
import { Deliver, Livraison } from "../../../models";

export const adminGetAllLivraison = (app : Application)=>{
  app.get('/admin/livraison', async (req : Request, res : Response) => {
    try {
      const livraisons = await Livraison.findAll({
        include:[
          {
            as: 'deliveryman',
            model : Deliver,
          }
        ]
      });
      res.status(200).json(livraisons);
      return;
    } 
    catch (err) {
      console.error(err);
      res.status(500).send({ message: "Internal server error" });
      return;
    }
  });
}