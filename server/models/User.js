const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName :{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    email :{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    accountType:{
        type:String,
        enum:["Admin","Student","Instructor"],
        required:true
    },
    additionalDetails:{
        //this is profile detail
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref : "Profile",
    },
    courses:[
        // kee sare courses honge isliye array define kiya
        {
           type:mongoose.Schema.Types.ObjectId,
           ref:"Course",
        }
    ],
    image:{
        type:String,
        required:true,
    },
    token:{
        type:String,
        
    },
    resetPasswordExpires:{
        type: Date,
    },
    courseProgress:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"CourseProgess",
        }
    ]


});

module.exports = mongoose.model("User",userSchema);