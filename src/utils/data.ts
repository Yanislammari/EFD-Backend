import nodemailer from 'nodemailer';


export const keyToken = '1iAàLaN0Q-6B@&$B';

export const passwordDb = 'root';
export const userDb = 'root';
export const hostDb = 'efd_db';

export const emailEFD = "efd.backend@gmail.com"


export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailEFD,
    pass: 'wjiq mltl cajt tljk',
  },
});
