const nodemailer = require('nodemailer');

export const sendMail = async (receiver: string, securityCode: number) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
      user: 'samuelplaton0@gmail.com', // generated ethereal user
      pass: 'SAmuel..07012000', // generated ethereal password
    },
  });
  await transporter.sendMail({
    from: '"Share.it" <admin@shareit.com>', // sender address
    to: receiver, // list of receivers
    subject: 'Share.it - Confirmation Code', // Subject line
    text: `${securityCode}`, // plain text body
  });
}