const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt")
const crypto = require("crypto")
//resetPasswordToken
exports.resetPasswordToken = async(req,res) =>{
    try{
        //get email from req body
        const email = req.body.email;
       // check user for this email , email validation
       const user = await User.findOne({email:email});
       if(!user){
        return res.status(401).json({
             success:false,
             message:'Your email is not registered with us',
        })
       }

       //Genearate token
       const token = crypto.randomUUID();
      //update the user by adding token and expiration time
       const updatedDetails = await User.findOneAndUpdate(
               {email:email},
               {
                token :token,
                resetPasswordExpires:Date.now() + 5*60*1000,
               },
               {new:true}// this will return updated doc
       );
       //create url 
       const url = `http://localhost:3000/update-password/${token}`
       //send mail containg the url
       await mailSender(email,
        "Password Reset Link",
        `Password reset link: ${url}`,
       );
       // return response
       return res.json({
        success:true,
        message:"Email send successfully change your password",
        url
       })


       

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while reset message"
        })

    }

}



//reset password

exports.resetPassword = async (req , res)=>{
    try{
        //data fetch
        //token to url me hai?
        //frontend ne teeno cheeze pakdi aur body me dal do
        const{password,confirmPassword,token} = req.body;
        //validation
        if(password!==confirmPassword){
            return res.json({
                success:false,
                message:"Confirm password not match"
            });
        }
        //get user detail from user using token
        const userDetails = await User.findOne({token:token});

        //if no entry - invalid token
        if(!userDetails){
            return res.json({
                success:false,
                message:"Token is invalid",
            })
        }
        //token time check
        if(userDetails.resetPasswordExpires<Date.now()){
             return res.json({
                success:false,
                messsage:"Token Expired, please regenetrate the token"
             })
        }
        //hash password
        const hashedPassword = await bcrypt.hash(password,10);
        //password update
        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true},
        );
        //return res

        return res.status(200).json({
            success:true,
            message:"Your password is reset"
        })



    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error occured  while reseting password",
        })

    }
}
