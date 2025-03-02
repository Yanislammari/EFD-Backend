import { Application, Request, Response } from "express";
import { Deliver } from "../../models";
import bcrypt from "bcrypt"
import { emailEFD, transporter } from "../../utils";


export const getNewPasswd = (app : Application)=>{
  app.post('/deliveryman/forgot_password', async (req : Request, res : Response):Promise<any> => {
    try{
      const clearPasswd = Math.random().toString(36).substring(2,10);
      const salt = await bcrypt.genSalt(10);
      const cachPasswd = await bcrypt.hash(clearPasswd,salt);
      const emailUser = req.body.email
      
      const deliver = await Deliver.findOne({
        where : {
            email : emailUser
        }
      });

      if(deliver == null){
        return res.status(401).json({message : "No such email"});
      }

      const mailOptions = {
        from : emailEFD,
        to : emailUser,
        subject : "Forgotten password EFD",
        text : "You forgot your password here is the new one : \n\n"+clearPasswd
      }

      deliver.password = cachPasswd;
      await deliver.save();

      transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error);
            res.status(500).json({message : "Probleme inconnu"});
        }
        else{
            res.status(200).json({message : "Sent email successfull"});
        }
      })
    }
    catch (err) {
      console.log(err);
      res.status(500).send({ message: "Internal server error" });
      return;
    }
  });
};