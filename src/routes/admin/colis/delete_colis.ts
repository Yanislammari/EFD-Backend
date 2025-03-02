import { Request, Response, Application } from "express";
import { createVerifyTokenMiddleware } from "../../../middleware";
import { isAdminMiddleware } from "../../../middleware/isAdmin";
import { Colis } from "../../../models";

export const adminDeleteColis = (app: Application) => {
  app.delete("/admin/colis/:uuid", createVerifyTokenMiddleware(), isAdminMiddleware(), async (req: Request, res: Response) => {
    try {
      const uuid = req.params.uuid;

      console.log(`📌 Tentative de suppression du colis avec UUID: ${uuid}`);

      const colis = await Colis.findByPk(uuid);
      if (!colis) {
        console.log("❌ Colis non trouvé");
        res.status(404).json({ error: "Parcel not found" });
        return;
      }

      await colis.destroy();
      console.log("✅ Colis supprimé avec succès");

      res.status(200).json({ message: "Parcel deleted" });
      return;
    } catch (err) {
      console.error("❌ Erreur serveur lors de la suppression du colis :", err);
      res.status(500).send({ message: "Internal server error" });
      return;
    }
  });
};
