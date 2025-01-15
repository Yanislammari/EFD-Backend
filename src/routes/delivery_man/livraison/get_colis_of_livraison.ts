import { Application, Request, Response } from "express";
import { attributesColis, attributesLivraison, Colis, Livraison } from "../../../models";
import { tokenText } from "../../../middleware";
import { Op } from "sequelize";

export const deliveryManGetColisToDeliver = (app : Application)=>{
  app.get('/deliveryman/colis', async (req : Request, res : Response) => {
    try{
      const idUser = req[tokenText].id;
      const today = new Date();
      const closestLivraison = await Livraison.findAll({
        where: {
          [attributesLivraison.deliveryman_id] : idUser,
          [attributesLivraison.livraison_date]: {
            [Op.gte]: today, // Exclude dates earlier than today
          },
        },
        order: [
          [attributesLivraison.livraison_date, 'ASC']
        ]
      });
      const idLivraison = closestLivraison[0].uuid;
      const colisToDeliver = await Colis.findAll({
        where: {
          [attributesColis.livraison_id] : idLivraison,
        }
      });
      res.status(200).json(colisToDeliver);
      return;
    } 
    catch (err) {
      res.status(500).send({ message: "Internal server error" });
      return;
    }
  });
}