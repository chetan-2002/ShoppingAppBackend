const nodemailer = require("nodemailer");

const sendEmail = async (email, html, subject, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "mealmonkey001@gmail.com",
    to: `${email}`,
    subject: `${subject}`,
    html: `${html}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).json({
        message: "Error in sending mail",
      });
    } else {
      res.status(200).json({
        message: "Email sent Successfully",
      });
    }
  });
};

module.exports = {
  sendEmail,
};
