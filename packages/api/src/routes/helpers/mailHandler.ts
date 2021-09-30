const nodemailer = require('nodemailer');

export const sendMail = async (
  receiver: string,
  title: string,
  message: string | number,
  html?: string,
) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
      user: 'samuelplaton0@gmail.com',
      pass: 'SAmuel..07012000',
    },
  });

  await transporter
    .sendMail({
      from: '"Share.it" <admin@shareit.com>', // sender address
      to: receiver, // list of receivers
      subject: `Share.it - ${title}`, // Subject line
      text: `${message}`, // plain text body,
      html: html,
    })
    .catch((err) => console.log(err));
};
