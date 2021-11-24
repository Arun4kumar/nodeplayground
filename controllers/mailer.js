const nodemailer = require("nodemailer");

module.exports.sendCode = async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ktarun81190@gmail.com",
      pass: "vqczkiexlgubcitg",
    },
  });
  let code = Math.random * 1000000;
  const mailOptions = {
    from: "no-reply<ktarun81190@gmail.com>",
    to: "arunkumaremail04@gmail.com",
    subject: "Registration code",
    text: "please do not share it...",
    html:
      '<h1 style="text-align:center">Your Code:' + Math.ceil(code) + "</h1>",
  };

  const response = await transporter.sendMail(mailOptions);
  if (response.error) {
    throw new Error(error);
  }
  console.log("Mail sent: ", response.response);
  res.end();
};
