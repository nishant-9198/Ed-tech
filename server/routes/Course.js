//import the require module
const express = require("express")
const router = express.Router()


//Course controller
const {
    createCourse,
    getCourseDetails,
    getAllCourse,
    editCourse,
    getInstructorCourses,
    deleteCourse,
    getFullCourseDetails,

} = require("../controllers/Course")

// category controller
const {
    showAllCategory,
    createCategory,
    categoryPageDetail
} = require("../controllers/Category")

// rating review controller
const {
    createRating,
    getAverageRating,
    getAllRating,
} = require("../controllers/RatingAndReview")

// section controller
const {
    createSection,
    deleteSection,
    updateSection
} = require("../controllers/Section")

// subsection controller
const {
    createSubSection,
    updateSubSection,
    deleteSubSection,
} = require("../controllers/Subsection")


const {
  updateCourseProgress,
  getProgressPercentage,
} = require("../controllers/courseProgress")

const { auth, isInstructor, isAdmin, isStudent } = require("../middlewares/auth")

//course can be oblu created by istructor
router.post("/createCourse", auth, isInstructor, createCourse)
// Edit Course routes
router.post("/editCourse", auth, isInstructor, editCourse)

// Get all Courses Under a Specific Instructor
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
// Get Details for a Specific Courses
router.post("/getFullCourseDetails", auth, getFullCourseDetails)
//add a section to course
router.post("/createSection", auth, isInstructor, createSection)
//update section
router.post("/updateSection", auth, isInstructor, updateSection)
//delete section
router.post("/deleteSection", auth, isInstructor, deleteSection)
//update subsection
router.post("/updateSubsection", auth, isInstructor, updateSubSection)
//delete subsec
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)
//add subse to section
router.post("/createSubSection", auth, isInstructor, createSubSection)
//get all registered course
router.post("/getAllCourse", getAllCourse)
//get details for specific coures
router.post("/getCourseDetails", getCourseDetails)

// To Update Course Progress
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress)

router.delete("/deleteCourse", deleteCourse)

// category controller
router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategory", showAllCategory)
router.post("/categoryPageDetail", categoryPageDetail)

//rating revie
router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)

module.exports = router

