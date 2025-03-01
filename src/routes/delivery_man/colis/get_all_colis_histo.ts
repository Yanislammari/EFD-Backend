import { Application, Request, Response } from "express";
import { Adress, attributesColis, Colis, Livraison } from "../../../models";
import { createVerifyTokenMiddleware, tokenText } from "../../../middleware";

export const getAllColisHistoDeliver = (app : Application)=>{
  app.get('/deliveryman/histo_colis',createVerifyTokenMiddleware(), async (req : Request, res : Response) => {
    try{
      const id = req[tokenText].id;
      const livraisons = await Livraison.findAll({
        where: {
          deliveryman_id: id
        }
      });
      const colis = await Colis.findAll({
        where: {
          livraison_id: livraisons.map(livraison => livraison.uuid),
          [attributesColis.status]: "done"
        },
        include:[
          {
            as: 'adress',
            model : Adress,
          }
        ]
      });
      res.status(200).json(colis);
    }
    catch (err) {
      console.log(err);
      res.status(500).send({ message: "Internal server error" });
      return;
    }
  });
};