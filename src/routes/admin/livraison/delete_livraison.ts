import { Application, Request, Response } from "express";
import { Livraison } from "../../../models";

export const adminDeleteLivraison = (app : Application)=>{
  app.delete('/admin/livraison/:uuid', async (req : Request, res : Response) => {
    try {
      const livraison = await Livraison.findOne();
      await Livraison.destroy({
        where: {
          uuid: req.params.uuid
        }
      });
      res.status(200).json({ message: "Livraison deleted" });
      return;
    } 
    catch (err) {
      console.error(err);
      res.status(500).send({ message: "Internal server error" });
      return;
    }
  });
}