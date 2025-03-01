import { Application, Request, Response } from "express";
import { Adress, Colis, attributesColis } from "../../../models";

//get all the colis of the livraison you want

export const deliveryManGetAllLivraisonColis = (app : Application)=>{
  app.get('/deliveryman/colis/:livraison_id', async (req : Request, res : Response) => {
    try{
      const colis = await Colis.findAll({
        where: {
          [attributesColis.livraison_id] : req.params.livraison_id,
          [attributesColis.status]: 'pending'
        },
        include:[
          {
            as: 'adress',
            model: Adress,
          }
        ]
      });
      res.status(200).json(colis);
      return;
    } 
    catch (err) {
      console.log(err);
      res.status(500).send({ message: "Internal server error" });
      return;
    }
  });
}