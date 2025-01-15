import { Application, Request, Response } from "express";
import { attributesColis, Colis, Livraison } from "../../../models";
import { Op } from "sequelize";

export const createLivraison = (app : Application)=>{
  app.post('/admin/livraison', async (req : Request, res : Response) => {
    try {
      const livraison = await Livraison.create(req.body.livraison);
      const livraisonUuid = livraison.uuid;
      
      const colisIds = req.body.colis as string[];

      await Colis.update(
        { [attributesColis.livraison_id]: livraisonUuid },
        {
          where: {
            uuid: {
              [Op.in]: colisIds,
            },
          },
        }
      );
      res.status(200).json({livraison : livraison, colis : colisIds});
      return;
    } 
    catch (err) {
      console.log(err);
      res.status(500).send({ message: "Internal server error" });
      return;
    }
  });
}