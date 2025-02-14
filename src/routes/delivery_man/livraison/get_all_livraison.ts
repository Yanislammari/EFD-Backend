import { Application, Request, Response } from "express";
import { attributesLivraison, Livraison } from "../../../models";
import { createVerifyTokenMiddleware, tokenText } from "../../../middleware";

export const deliveryManGetAllLivraison = (app : Application)=>{
  app.get('/deliveryman/livraison', createVerifyTokenMiddleware(), async (req : Request, res : Response) => {
    try{
      const idDelivery = req[tokenText].id;
      const livraisons = await Livraison.findAll({
        where: {
          [attributesLivraison.deliveryman_id] : idDelivery,
        }
      });
      res.status(200).json(livraisons);
      return;
    } 
    catch (err) {
      console.log(err);
      res.status(500).send({ message: "Internal server error" });
      return;
    }
  });
}