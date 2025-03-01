import { Application, Request, Response } from "express";
import { Deliver } from "../../models";
import { tokenText } from "../../middleware";

export const changeCoordinateDeliveryMan = (app : Application)=>{
  app.patch('/deliveryman/position', async (req : Request, res : Response) => {
    try{
      const id = req[tokenText].id;
      const deliver = await Deliver.findByPk(id);
      if(deliver === null){
        res.status(404).send({message: "Deliver not found"});
        return;
      }
      const lat = req.body.lat;
      const lng = req.body.lng;
      deliver.lat = lat;
      deliver.lng = lng;
      await deliver.save();
      res.status(200).json({message : "Success"});
    }
    catch (err) {
      console.log(err);
      res.status(500).send({ message: "Internal server error" });
      return;
    }
  });
};