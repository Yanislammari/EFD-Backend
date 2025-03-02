import nodemailer from 'nodemailer';


export const keyToken = '1iAàLaN0Q-6B@&$B';

export const passwordDb = 'root';
export const userDb = 'root';
export const hostDb = 'efd_db';

export const googleEmail= "efd.backend@gmail.com";

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: googleEmail,
    pass: 'jfxk zngm tsoq rlmr',
  },
});


