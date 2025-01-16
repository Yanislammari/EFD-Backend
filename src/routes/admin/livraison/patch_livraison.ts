import { Application, Request, Response } from "express";
import { attributesColis, Colis, Deliver, Livraison } from "../../../models";
import { Op } from "sequelize";

export const adminPatchLivraison = (app : Application)=>{

  //requiert un json livraison : { ... }
  // une array de colis_uuid a ajouter dans la base de donnée.  colis : [...]
  // il est nécessaire de mettre les colis uuid déjà présent dans la livraison dans colis

  app.patch('/admin/livraison/:uuid', async (req : Request, res : Response) => {
    try {
      await Livraison.update(
        req.body.livraison,
        {
          where: { uuid: req.params.uuid },
        }
      );

      await Colis.update(  //remove all colis from the livraison
        { livraison_id: null },
        { where: { [attributesColis.livraison_id]: req.params.uuid } }
      );


      const colisToAdd = req.body.colis as string[];  //all colis to add at the livraison

      await Colis.update( //add all colis to the livraison
        { livraison_id: req.params.uuid },
        { where: { uuid: { [Op.in]: colisToAdd } } }
      );

      res.status(200).json({
        livraison : req.body.livraison,
        colis : colisToAdd
      });
      return;
    } 
    catch (err) {
      console.error(err);
      res.status(500).send({ message: "Internal server error" });
      return;
    }
  });
}