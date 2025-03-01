import { Application, Request, Response } from "express";
import { Adress, attributesColis, attributesLivraison, Colis, Livraison } from "../../../models";
import { createVerifyTokenMiddleware, tokenText } from "../../../middleware";
import { Op } from "sequelize";

export const deliveryManGetColisToDeliver = (app : Application)=>{
  // Get all colis of the closest livraison
  app.get('/deliveryman/colis', createVerifyTokenMiddleware(), async (req : Request, res : Response) => {
    try{
      const idUser = req[tokenText].id;
      const today = new Date();
      const closestLivraison = await Livraison.findAll({
        where: {
          [attributesLivraison.deliveryman_id] : idUser,
          [attributesLivraison.livraison_date]: {
            [Op.gte]: today, // Exclude dates earlier than today
          },
          [attributesColis.status]: 'pending'
        },
        order: [
          [attributesLivraison.livraison_date, 'ASC']
        ]
      });
      const idLivraison = closestLivraison[0].uuid;
      const colisToDeliver = await Colis.findAll({
        where: {
          [attributesColis.livraison_id] : idLivraison,
        },
        include: [
          {
            as: 'adress',
            model: Adress,
          }
        ]
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