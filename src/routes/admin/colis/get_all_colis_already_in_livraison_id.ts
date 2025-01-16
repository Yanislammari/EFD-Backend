import { Application, Request, Response } from "express";
import { Adress, Colis } from "../../../models";

export const adminGetAllColisOfLivraison = (app : Application)=>{

  //return all colis
  //return all colis that are in the livraison
  //so to do the patch livraison we can access the colis id already in the livraison
  app.get('/admin/colis_to_deliver/:livraison_id', async (req : Request, res : Response) => {
    try {
      const colis = await Colis.findAll({
        include:[
          {
            as: 'adress',
            model : Adress,
          }
        ]
      });
      colis.forEach(colisItem => {
        if(colisItem.livraison_id === req.params.livraison_id){
          colisItem.status = 'to_deliver';
        }
      });
      res.status(200).json(colis);
      return;
    } 
    catch (err) {
      console.error(err);
      res.status(500).send({ message: "Internal server error" });
      return;
    }
  });
}