import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { FreeMode, Pagination, Autoplay } from "swiper/modules"
import CourseCard from "./CourseCard"

function CourseSlider({ Courses }) {
  const hasCourses = Courses && Courses.length > 0

  return (
    <>
      {hasCourses ? (
        <Swiper
  slidesPerView={1}
  spaceBetween={20}
  loop={Courses.length > 1}
  loopFillGroupWithBlank={true}
  autoplay={{
    delay: 2000,
    disableOnInteraction: false,
  }}
  modules={[FreeMode, Pagination, Autoplay]}
  pagination={{ clickable: true }}
  breakpoints={{
    640: { slidesPerView: 2, spaceBetween: 20 },
    1024: { slidesPerView: 3, spaceBetween: 25 },
  }}
  className="max-h-[30rem] px-4"  // ✅ add horizontal padding
>
  {Courses.map((course, i) => (
    <SwiperSlide key={i} className="flex justify-center"> 
      {/* ✅ prevent stretching */}
      <div className="max-w-[300px] w-full">
        <CourseCard course={course} Height={"h-[220px]"} />
      </div>
    </SwiperSlide>
  ))}
</Swiper>

      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </>
  )
}

export default CourseSlider
