import { Application, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { createVerifyTokenMiddleware } from '../../../middleware';
import { Colis } from '../../../models';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Store images in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file with timestamp
  }
});

const upload = multer({ storage: storage });
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir,{recursive: true});
}

export const postPhoto = (app : Application)=>{
  app.post('/upload/:colis_id',createVerifyTokenMiddleware(),upload.single('photo'), async (req:Request,res:Response):Promise<any> => {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const colisId = req.params.colis_id;
    const colis = await Colis.findByPk(colisId);
    colis.image_path = `/uploads/${req.file.filename}`;
    colis.status = 'done';
    await colis.save();
    return res.json({ message: 'File uploaded successfully', filePath: `/uploads/${req.file.filename}`});
  });
}
