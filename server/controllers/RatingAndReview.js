const mongoose = require("mongoose");
const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");

// ============================
// Create Rating & Review
// ============================
exports.createRating = async (req, res) => {
  try {
    // ✅ Get the user id
    // This is added by the auth middleware
    // We send it in the payload of the token
    const userId = req.user.id;

    // ✅ Fetch data from req body
    const { rating, review, courseId } = req.body;

    // ✅ Check if user is already enrolled or not
    // Here we check in Course schema's "studentEnrolled" array
    const courseDetails = await Course.findOne({
      _id: courseId,
      // $elemMatch finds if any element matches the condition
      studentEnrolled: { $elemMatch: { $eq: new mongoose.Types.ObjectId(userId) } },
    });

    // If course not found or user not enrolled
    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: "Student is not enrolled in the course",
      });
    }

    // ✅ Check if user has already given a rating and review for this course
    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });

    if (alreadyReviewed) {
      return res.status(403).json({
        success: false,
        message: "Course is already reviewed by the user",
      });
    }

    // ✅ Create rating and review document
    const ratingReview = await RatingAndReview.create({
      rating,
      review,
      course: courseId,
      user: userId,
    });

    // ✅ Update course with this rating/review id
    await Course.findByIdAndUpdate(courseId, {
      $push: { ratingAndReviews: ratingReview._id },
    });

    // ✅ Return response
    return res.status(200).json({
      success: true,
      message: "Rating and review created successfully",
      ratingReview,
    });
  } catch (error) {
    console.error("Error creating rating:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// Get Average Rating for a Course
// ============================
exports.getAverageRating = async (req, res) => {
  try {
    // ✅ Get course id from req.body
    const { courseId } = req.body;

    // ✅ Calculate average rating using MongoDB aggregation
    const result = await RatingAndReview.aggregate([
      {
        // Match entries having the given course id
        $match: {
          course: new mongoose.Types.ObjectId(courseId), // courseId is initially a string
        },
      },
      {
        // Group all the matched entries and calculate avg
        // _id: null means group all documents into one
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    // ✅ Return rating if exists
    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating, // Aggregate returns array with result object
      });
    }

    // ✅ If no rating/review exist
    return res.status(200).json({
      success: true,
      message: "Average Rating is 0, no ratings given yet",
      averageRating: 0,
    });
  } catch (error) {
    console.error("Error getting average rating:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// Get All Ratings & Reviews
// ============================
exports.getAllRating = async (req, res) => {
  try {
    // ✅ No particular filter → get all rating and review
    const allReviews = await RatingAndReview.find({})
      .sort({ rating: -1 }) // Highest rating first
      .populate({
        path: "user", // Populate user details
        select: "firstName lastName email image",
      })
      .populate({
        path: "course", // Populate course name
        select: "courseName",
      })
      .exec();

    // ✅ Return response
    return res.status(200).json({
      success: true,
      message: "All reviews fetched successfully",
      data: allReviews,
    });
  } catch (error) {
    console.error("Error getting all ratings:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
