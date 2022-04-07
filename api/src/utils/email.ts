const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const Config = require('../config/dev')

type EmailType = {
  email: string;
  subject: string;
  payload: any;
  template: string;
}

const sendEmail = async ({ email, subject, payload, template }: EmailType) => {
  try {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      secure: true,
      port: 465,
      pool: true,
      auth: {
        user: Config.email_username || 'username',
        pass: Config.email_password || 'pass',
      },
    });

    transporter.verify(function (error:any, success:any) {
      if (error) {
        console.log('error:', error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });

    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    const compiledTemplate = handlebars.compile(source);
    const options = () => {
      return {
        from: process.env.FROM_EMAIL,
        to: email,
        subject: subject,
        html: compiledTemplate(payload),
      };
    };

    // Send email
    transporter.sendMail(options(), (error: any, info: any) => {
      if (error) {
        return error;
      } else {
        transporter.close();
        return {
            status: 200,
            isSuccessful: true,
            message: "Email reset sent successfully!",
        }
      }
    });
  } catch (error) {
    return error;
  }
};

module.exports = sendEmail;