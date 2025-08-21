const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Course = require("../models/Course");
const User = require("../models/User");
const Category = require("../models/Category");
const SubSection = require("../models/Subsection")
const Section = require("../models/Section")
const CourseProgress = require("../models/CourseProgress")
const { convertSecondsToDuration } = require("../utils/secToDuration")
// Create course handler
exports.createCourse = async (req, res) => {
  try {
    const {
      courseName,
      courseDescription,
      price,
      tag,
      whatYouWillLearn,
      category,
      status,
      instructions: _instructions,
    } = req.body;

    const thumbnail = req.files?.thumbnailImage;

    // --- Parse instructions ---
    let parsedInstructions;
    try {
      parsedInstructions = typeof _instructions === "string" ? JSON.parse(_instructions) : _instructions;
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Invalid JSON format for instructions",
        error: err.message,
      });
    }

    // --- Parse tags ---
    let parsedTags;
    try {
      parsedTags = typeof tag === "string" ? JSON.parse(tag) : tag;
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Invalid JSON format for tag",
        error: err.message,
      });
    }

    // --- Check for missing fields ---
    const missingFields = [];
    if (!courseName) missingFields.push("courseName");
    if (!courseDescription) missingFields.push("courseDescription");
    if (!whatYouWillLearn) missingFields.push("whatYouWillLearn");
    if (!price) missingFields.push("price");
    if (!parsedTags?.length) missingFields.push("tag");
    if (!category) missingFields.push("category");
    if (!thumbnail) missingFields.push("thumbnailImage");
    if (!parsedInstructions?.length) missingFields.push("instructions");

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing fields: ${missingFields.join(", ")}`,
      });
    }

    // --- Set default status ---
    const finalStatus = status || "Draft";

    // --- Instructor validation ---
    const instructorId = req.user.id;
    const instructorDetails = await User.findById(instructorId).populate();
    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      });
    }

    // --- Category validation ---
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // --- Upload thumbnail ---
    const uploadedThumbnail = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    // --- Create course ---
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn,
      price,
      tag: parsedTags,
      category: categoryDetails._id,
      thumbnail: uploadedThumbnail.secure_url,
      status: finalStatus,
      instructions: parsedInstructions,
    });

    // --- Add course to instructor and category ---
    await User.findByIdAndUpdate(instructorDetails._id, {
      $push: { courses: newCourse._id },
    });

    const updatedCategory = await Category.findByIdAndUpdate(
      category,
      {
        $addToSet: { course: newCourse._id }, // prevents duplicates
      },
      { new: true }
    );

    console.log("Category updated with course:", updatedCategory);

    return res.status(200).json({
      success: true,
      message: "Course created successfully",
      data: newCourse,
    });

  } catch (error) {
    console.error("Error in createCourse:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while creating course",
      error: error.message,
    });
  }
};

// getAllCourse handler function

exports.getAllCourse = async (res, req) => {
  try {

    const allCourses = await Course.find({ status: "Published" }, {
      courseName: true,
      price: true,
      thumbnail: true,
      instructor: true,
      ratingAndReviews: true,
      studentEnrolled: true,
    })
      .populate("instructor")
      .exec();


    return res.status(200).json({
      success: true,
      message: "data for all the course fetched successfully",
      data: allCourses,
    })
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in getting courses data",
      error: error.message,
    })
  }
}

// getallcoursedetail

exports.getCourseDetails = async (req, res) => {
  try {
    // fetch the id of course
    const { courseId } = req.body;
    // find course details
    const courseDetail = await Course.find(
      { _id: courseId })
      .populate(
        {
          path: "instructor",// it is refrence to user schema
          populate: {
            path: "additionalDetails"
          }
        }
      )
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      }).exec();

    //validation
    if (!courseDetail) {
      return res.status(400).json({
        success: false,
        message: `Could not find the course with ${courseId}`,

      })
    }

    // return res
    return res.status(200).json({
      success: true,
      message: 'Course detail found',
      courseDetail,
    })



  }
  catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,

    })
  }
}



// Edit Course Details
exports.editCourse = async (req, res) => {
  try {
    const { courseId, ...updates } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    // Find course by ID
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Handle thumbnail update if present
    if (req.files?.thumbnailImage) {
      console.log("Thumbnail update detected");
      const thumbnail = req.files.thumbnailImage;
      const uploadedImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      );
      course.thumbnail = uploadedImage.secure_url;
    }

    // Update provided fields
    for (const key in updates) {
      if (Object.prototype.hasOwnProperty.call(updates, key)) {
        if (key === "tag" || key === "instructions") {
          try {
            course[key] = JSON.parse(updates[key]);
          } catch (parseError) {
            return res.status(400).json({
              success: false,
              message: `Failed to parse JSON for field: ${key}`,
              error: parseError.message,
            });
          }
        } else if (key !== "courseId") {
          course[key] = updates[key];
        }
      }
    }

    // Save updated course
    await course.save();

    // Populate related data
    const updatedCourse = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      });

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


// Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.id

    // Find all courses belonging to the instructor
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 })

    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    })
  }
}

// Delete the Course
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body

    // Find the course
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    // Unenroll students from the course
    const studentsEnrolled = course.studentEnrolled
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      })
    }

    // Delete sections and sub-sections
    const courseSections = course.courseContent
    for (const sectionId of courseSections) {
      // Delete sub-sections of the section
      const section = await Section.findById(sectionId)
      if (section) {
        const subSections = section.subSection
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId)
        }
      }

      // Delete the section
      await Section.findByIdAndDelete(sectionId)
    }

    // Delete the course
    await Course.findByIdAndDelete(courseId)

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}


// Helper: Convert "HH:MM:SS" or "MM:SS" or "SS" → total seconds
function parseDurationToSeconds(duration) {
  if (!duration) return 0;

  const parts = duration.split(":").map(Number).reverse();
  let seconds = 0;

  if (parts[0]) seconds += parts[0];        // seconds
  if (parts[1]) seconds += parts[1] * 60;   // minutes
  if (parts[2]) seconds += parts[2] * 3600; // hours

  return seconds;
}

exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    // ✅ Find course with all populated data
    const courseDetails = await Course.findOne({ _id: courseId })
      .populate({
        path: "instructor",
        populate: { path: "additionalDetails" },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: { path: "subSection" },
      })
      .exec();

    // ✅ Find course progress for user
    let courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    });

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      });
    }

    // ✅ Calculate total duration in seconds
    let totalDurationInSeconds = 0;
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        totalDurationInSeconds += parseDurationToSeconds(subSection.timeDuration);
      });
    });

    // ✅ Convert total seconds into human-readable format
    const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

    // ✅ Send response
    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos || [],
      },
    });
  } catch (error) {
    console.error("Error in getFullCourseDetails:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};