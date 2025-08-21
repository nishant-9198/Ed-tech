import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import GetAvgRating from "../../../utils/avgRating"
import RatingStars from "../../common/RatingStars"

function CourseCard({ course }) {
  const [avgReviewCount, setAvgReviewCount] = useState(0)

  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReviews)
    setAvgReviewCount(count)
  }, [course])

  return (
    <Link to={`/courses/${course._id}`}>
      <div className="w-full sm:w-[90%] md:w-[320px] lg:w-[360px] xl:w-[400px] 
                      rounded-lg transition-all duration-200 
                      hover:scale-[1.01] hover:shadow-lg mx-auto bg-richblack-800">
        
        {/* Thumbnail */}
        <div className="rounded-lg overflow-hidden">
          <img
            src={course?.thumbnail}
            alt="course thumbnail"
            className="w-full aspect-video object-cover"
          />
        </div>

        {/* Course Info */}
        <div className="flex flex-col gap-2 px-2 py-3">
          <p className="text-base sm:text-lg md:text-xl font-semibold text-richblack-5 line-clamp-2">
            {course?.courseName}
          </p>
          <p className="text-xs sm:text-sm text-richblack-50">
            {course?.instructor?.firstName} {course?.instructor?.lastName}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-base text-yellow-5">
              {avgReviewCount || 0}
            </span>
            <RatingStars Review_Count={avgReviewCount} />
            <span className="text-xs sm:text-sm text-richblack-400">
              {course?.ratingAndReviews?.length} Ratings
            </span>
          </div>

          {/* Price */}
          <p className="text-base sm:text-lg md:text-xl font-semibold text-richblack-5">
            Rs. {course?.price}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default CourseCard
