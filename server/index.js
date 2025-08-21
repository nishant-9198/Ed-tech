const express = require("express");
const app = express();

const userRoutes = require("./routes/User")
const profileRoutes = require("./routes/Profile")
const paymentRoutes = require("./routes/Payment")
const courseRoutes = require("./routes/Course")
const contactUsRoute = require("./routes/Contact");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect} = require("./config/cloudinary")
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

const PORT = process.env.PORT || 4000;
//connecting to database
database.dbConnect();
// adding middleware
app.use(express.json());
app.use(cookieParser());
app.use(
    cors(
        {   // request from frontend that should be entertain
            origin:"http://localhost:3000",
            credentials:true,
        }
    )
)

//file upload
app.use(
   
       fileUpload({
         useTempFiles:true,
         tempFileDir:"/tmp",
       }) 
   
)

//cloudinary connection
cloudinaryConnect();
//route mount
app.use("/api/v1/auth",userRoutes)
app.use("/api/v1/profile",profileRoutes)
app.use("/api/v1/course",courseRoutes)
app.use("/api/v1/payment",paymentRoutes)
app.use("/api/v1/reach", contactUsRoute);

//def route
app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:'Your server is up and running....'
    });
});

app.listen(PORT,()=>{
    console.log(`App is running at ${PORT}`)
})

// {
//      "firstName":"Nishant",
//      "lastName":"tiwari",
//      "password":"123456",
//      "confirmPassword":"123456",
//      "email":"anunish9198@gmail.com",
//      "accountType":"Admin",
//      "otp": "997368"

// }




