const nodemailer = require("nodemailer");

//desc - send mail to user
//route - POST /api/sendmail/
const sendmail = async (req, res) => {
  const { email, html, subject } = req.body;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "mealmonkey001@gmail.com",
      pass: "cbwdvbbjblhfmheq",
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
      //   console.log("Email sent: " + info.response);
      res.status(200).json({
        message: "Email sent Successfully",
      });
    }
  });
};

module.exports = {
  sendmail,
};
