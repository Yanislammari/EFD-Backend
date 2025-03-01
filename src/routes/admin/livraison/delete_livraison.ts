import { Application, Request, Response } from "express";
import { Livraison } from "../../../models";
import { createVerifyTokenMiddleware } from "../../../middleware";
import { isAdminMiddleware } from "../../../middleware/isAdmin";

export const adminDeleteLivraison = (app : Application)=>{
  app.delete('/admin/livraison/:uuid', createVerifyTokenMiddleware(), isAdminMiddleware(), async (req : Request, res : Response) => {
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