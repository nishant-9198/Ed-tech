const express = require("express");
const router = express.Router();
const { auth,isInstructor } = require("../middlewares/auth");
const {
    deleteProfile,
    updateProfile,
    getAllUserDetails,
    updateDisplayPicture,
     getEnrolledCourses,
      instructorDashboard,
} = require("../controllers/Profile");

// Delete user account
router.delete("/deleteProfile",auth, deleteProfile);

// Update user profile
router.put("/updateProfile",auth, updateProfile);

// Get all user details
router.get("/getUserDetails",auth, getAllUserDetails);

// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses)

router.put("/updateDisplayPicture", auth, updateDisplayPicture)

router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)
module.exports = router;
