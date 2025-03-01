import { Application, Request, Response } from "express";
import { Deliver, Livraison } from "../../../models";
import { createVerifyTokenMiddleware } from "../../../middleware";
import { isAdminMiddleware } from "../../../middleware/isAdmin";

export const adminGetAllLivraison = (app : Application)=>{
  app.get('/admin/livraison', createVerifyTokenMiddleware(), isAdminMiddleware(), async (req : Request, res : Response) => {
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