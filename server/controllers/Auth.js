// sendOPT
const User = require("../models/User");
const OTP = require("../models/Otp");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Profile = require("../models/Profile");
const mailSender = require("../utils/mailSender")
const { passwordUpdated } = require("../mail/templates/passwordReset")
require("dotenv").config();
exports.sendOTP = async(req , res) =>{
    try{
        // fetch the email from req ka body
    const{email}= req.body;

    //check that user already exist by using user model check in db 
    //use findOne({}) method
    const checkUserPresent = await User.findOne({email});

    // if user already exist
    if(checkUserPresent){
        return res.status(401).json({
            success:false,
            message:"User already registered"
        })
    }

    // now generate opt

    var otp = otpGenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false,
    });

    console.log("Otp generated",otp);
    
    //check uniquie otp

    let result = await OTP.findOne({
        opt:otp
    });
    // otp mil gya db me store karo
    while(result){
        // this is bad method because it make many call in db
        // at production level we use libray which only generate unique opt
        otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });

         result = await OTP.findOne({
            opt:otp
        });
        
    }

    // now creating payload/data of otp 
    // i.e info about otp
    const otpPayload = {email,otp};// createdAt by defalut le lega

    // create an entry in db
    // email pe otp send ho jayega
    const otpBody = await OTP.create(otpPayload);
    console.log(otpBody);

    // return the res
    res.status(200).json({
        success:true,
        message:"Otp sent successfully",
        otp,
    })

    }
    catch(error){
         console.log(error);
         return res.status(500).json({
            success:false,
            message:error.message,
         })
    }
}  

//sign up
exports.signUp = async (req, res) => {
    try {
        // Fetch data from request body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp
        } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match",
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already registered",
            });
        }

        // Get most recent OTP
        const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        console.log("Recent otp is",recentOtp);
        if ( recentOtp.length == 0) {
            return res.status(400).json({
                success: false,
                message: "OTP not found",
            });
        }

        // Validate OTP
        if (otp !== recentOtp[0].otp) {
            return res.status(403).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create profile details
        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber:  null,
        });

        // Create user
        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashedPassword,
            accountType,
            additionalDetails: profileDetails._id,
            image: `http://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        });

        // Return success response
        return res.status(200).json({
            success: true,
            message: "User registered successfully",
            user,
        });
    } catch (error) {
        console.error("Error in signUp:", error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again later.",
        });
    }
};

//login
exports.login = async (req , res)=>{
    try{
        //fetch the data from req body
        const {email,password} = req.body;

        //valid the data
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All field are required ,please try again"
            })
        }

        // check user exist or not
         const user = await User.findOne({email}).populate("additionalDetails");// we not need to populate
         if(!user){
            return res.status(401).json({
                success:false,
                message:"User not exit please signup first",
            });
         }
         // generate jwt token after matching password
         // match the password using compare method
         if(await bcrypt.compare(password,user.password)){
            const payload = {
                email:user.email,
                id:user._id,
                accountType:user.accountType,
            }
            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h",
            });
            //inserting token in user
            user.token = token;
            user.password = undefined;

            // create cookie
            const options = {
                expires:new Date(Date.now() + 3*24*60*60*1000),//expires in 3 day
                httpOnly:true,
               }
               res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged in successfully",
               })
                
  
        }
        else{
            return res.status(401).json({
                success:false,
                message:'Password is incorrect',
            })
        }



    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login falied ",
        })

    }
}

// changepassword
// Controller for Changing Password
exports.changePassword = async (req, res) => {
  try {
    // Get user data from req.user
    const userDetails = await User.findById(req.user.id)

    // Get old password, new password, and confirm new password from req.body
    const { oldPassword, newPassword } = req.body

    // Validate old password
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    )
    if (!isPasswordMatch) {
      // If old password does not match, return a 401 (Unauthorized) error
      return res
        .status(401)
        .json({ success: false, message: "The password is incorrect" })
    }

    // Update password
    const encryptedPassword = await bcrypt.hash(newPassword, 10)
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    )

    // Send notification email
    try {
      const emailResponse = await mailSender(
        updatedUserDetails.email,
        "Password for your account has been updated",
        passwordUpdated(
          updatedUserDetails.email,
          `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
        )
      )
      console.log("Email sent successfully:", emailResponse.response)
    } catch (error) {
      // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
      console.error("Error occurred while sending email:", error)
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      })
    }

    // Return success response
    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" })
  } catch (error) {
    // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
    console.error("Error occurred while updating password:", error)
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    })
  }
}
