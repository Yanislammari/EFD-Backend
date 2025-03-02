import { Request, Response, Application } from "express";
import { createVerifyTokenMiddleware } from "../../../middleware";
import { isAdminMiddleware } from "../../../middleware/isAdmin";
import { Colis, Adress } from "../../../models";

export const adminPatchColis = (app: Application) => {
  app.patch("/admin/colis/:uuid", createVerifyTokenMiddleware(), isAdminMiddleware(), async (req: Request, res: Response) => {
    try {
      const uuid = req.params.uuid;
      const { destination_name, adress } = req.body;

      console.log(`📌 Modification du colis avec UUID: ${uuid}`);
      console.log("📥 Données reçues :", req.body);

      const colis = await Colis.findByPk(uuid);
      if (!colis) {
        console.log("❌ Colis non trouvé");
        res.status(404).json({ error: "Parcel not found" });
        return;
      }

      // Mise à jour du colis
      const updateData: any = {};
      if (destination_name) updateData.destination_name = destination_name;

      // Vérifier si une nouvelle adresse est fournie
      if (adress) {
        console.log("📌 Mise à jour de l'adresse associée");
        const newAdress = await Adress.create(adress);
        updateData.adress_id = newAdress.uuid;
      }

      await colis.update(updateData);
      console.log("✅ Colis mis à jour avec succès");

      res.status(200).json(colis);
      return;
    } catch (err) {
      console.error("❌ Erreur serveur lors de la mise à jour du colis :", err);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  });
};
