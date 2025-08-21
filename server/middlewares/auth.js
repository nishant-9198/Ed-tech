const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

exports.auth = async (req, res, next) => {
    try {
        // Correctly extract token from cookies, body, or header
 const token =
  req.cookies?.token ||
  req.body?.token ||
  (req.header("Authorization")?.startsWith("Bearer ")
    ? req.header("Authorization").split(" ")[1]
    : null);

    

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing",
            });
        }

        // Verify the token
        try {
            // console.log("This is:",token)
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; // ✅ This gives you access to decoded.id
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid",
            });
        }

        next(); // Continue to next middleware or route handler
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while validating the token",
        });
    }
};

//isStudent
exports.isStudent = async (req, res, next) => {
    try {
        // first method is check the value of role from user token which is decoded in auth 
        // second way fropm db call
        //but first method isgood
        if (req.user.accountType !== "Student") {
            return res.status(401).json({
                success: false,
                message: 'This is protected routes for student only',

            });
        }
        next();

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User role is not varified please try again",
        })
    }


}



//isAdmin
exports.isAdmin = async (req, res, next) => {
    try {
        // first method is check the value of role from user token which is decoded in auth 
        // second way fropm db call
        //but first method isgood
        if (req.user.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: 'This is protected routes for admin only',

            });
        }
        next();

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User role is not varified please try again",
        })
    }


}


//isInstructor
exports.isInstructor = async (req, res, next) => {
    try {
        // first method is check the value of role from user token which is decoded in auth 

        if (req.user.accountType !== "Instructor") {
            return res.status(401).json({
                success: false,
                message: 'This is protected routes for Instructor only',

            });
        }
        next();

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: " User role is not varified please try again",
        })
    }


}

//reset password