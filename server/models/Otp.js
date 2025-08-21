const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,
    }
});

// a function - send email for otp verification before signup

async function sendVerificationEmail(email,otp){
    try{
         // mail res
         const mailResponse = await mailSender(email,"Verification Email from Expert Gurkul",otp);
         console.log("Email sent successfully",mailResponse);
    }
    catch(error){
        console.log("Error while sending the mails :" ,error);
        throw error;
    }
}

// now using the pre middleware
//schema ke upr pre() function hook  lga do 
// ise pre() hook se db me doc save hone se pehle verification mail jayega with current data
// then next()middleware call ho jayega
OTPSchema.pre("save",async function(next){
    await sendVerificationEmail(this.email,this.otp);
    next();
})

module.exports = mongoose.model("OTP",OTPSchema);