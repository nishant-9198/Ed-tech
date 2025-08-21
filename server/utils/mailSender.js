// creacting pre middleware for otp send
const nodemailer = require("nodemailer");

const mailSender = async (email,title,body) =>{
    try{
        //creating transpoter for sending mail
        let transporter = nodemailer.createTransport({
            host :process.env.MAIL_HOST,
            auth:{
                // kisko mail send karna hai vo email hai niche
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        })

        // sending the mail by using sendMail

        let info = await transporter.sendMail({
            from:'Expert Gurkul || CodeHelp - by babbar',
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`,
        })

        console.log(info);
        return info;

    }
    catch(error){
        console.log(error.message);
    }
}

module.exports = mailSender;