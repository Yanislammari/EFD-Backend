import { Application, Request, Response } from "express";
import { Adress, Colis } from "../../../models";
import { createVerifyTokenMiddleware } from "../../../middleware";
import { isAdminMiddleware } from "../../../middleware/isAdmin";

export const adminGetColisById = (app: Application) => {
  app.get('/admin/colis/:uuid', createVerifyTokenMiddleware(), isAdminMiddleware(), async (req: Request, res: Response) => {
    try {
      const { uuid } = req.params;
      const colis = await Colis.findOne({
        where: { uuid },
        include: [
          {
            as: 'adress',
            model: Adress,
          }
        ]
      });
      if (!colis) {
        res.status(404).send({ message: "Colis non trouvé" });
        return;
      }
      res.status(200).json(colis);
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Internal server error" });
    }
  });
};
