import React, { useEffect, useRef, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "../../App.css";
import { FaStar } from "react-icons/fa";
import { FreeMode, Autoplay } from "swiper/modules";
import { apiConnector } from "../../services/apiconnector";
import { ratingsEndpoints } from "../../services/apis";

function ReviewSlider() {
  const [reviews, setReviews] = useState([]);
  const [slidesPerView, setSlidesPerView] = useState(4);
  const swiperRef = useRef(null);
  const truncateWords = 15;

  useEffect(() => {
    (async () => {
      const { data } = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API
      );
      if (data?.success) {
        setReviews(data?.data);
      }
    })();

    const updateSlides = () => {
      if (window.innerWidth >= 1280) setSlidesPerView(4);
      else if (window.innerWidth >= 1024) setSlidesPerView(3);
      else if (window.innerWidth >= 640) setSlidesPerView(2);
      else setSlidesPerView(1);
    };
    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  // Speed proportional to visible slides
  const baseSpeed = 3000;
  const speed = Math.round((4 / slidesPerView) * baseSpeed);

  return (
    <div className="text-white px-4 sm:px-6 lg:px-8"> {/* 👈 Outer padding for the whole section */}
      <div className="relative my-[50px] h-auto max-w-maxContentTab lg:max-w-maxContent mx-auto">
        {/* Left gradient */}
        <div className="absolute left-0 top-0 h-full z-10 pointer-events-none 
                        bg-gradient-to-r from-white/90 dark:from-black/90
                        w-6 sm:w-8 md:w-12 lg:w-16"></div>

        {/* Right gradient */}
        <div className="absolute right-0 top-0 h-full z-10 pointer-events-none 
                        bg-gradient-to-l from-white/90 dark:from-black/90
                        w-6 sm:w-8 md:w-12 lg:w-16"></div>

        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          slidesPerView={slidesPerView}
          spaceBetween={20}
          loop={true}
          freeMode={true}
          freemodemomentum="false"
          speed={speed}
          autoplay={{
            delay: 1,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Autoplay]}
          className="w-full"
          observer={true}
          observeParents={true}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 },
            640: { slidesPerView: 2, spaceBetween: 12 },
            1024: { slidesPerView: 3, spaceBetween: 16 },
            1280: { slidesPerView: 4, spaceBetween: 20 },
          }}
        >
          {reviews.concat(reviews).map((review, i) => (
            <SwiperSlide
              key={i}
              className="min-w-0 px-2 sm:px-3 flex justify-center" // 👈 margin inside slider
              onMouseEnter={() => swiperRef.current?.autoplay.stop()}
              onMouseLeave={() => swiperRef.current?.autoplay.start()}
            >
              <div
                className="w-full max-w-[90%] sm:max-w-[95%] lg:max-w-none mx-auto
                           flex flex-col gap-2 sm:gap-3 
                           bg-richblack-800 
                           p-2 sm:p-3 md:p-4
                           text-[12px] sm:text-[14px] 
                           text-richblack-25 
                           transition-shadow duration-300 ease-out 
                           hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/20 
                           rounded-lg
                           min-h-[150px] sm:min-h-[170px] md:min-h-[180px]"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <img
                    src={
                      review?.user?.image
                        ? review?.user?.image
                        : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                    }
                    alt=""
                    className="h-8 w-8 sm:h-9 sm:w-9 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <h1 className="font-semibold text-richblack-5 text-[12px] sm:text-[14px]">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                    <h2 className="text-[10px] sm:text-[12px] font-medium text-richblack-500">
                      {review?.course?.courseName}
                    </h2>
                  </div>
                </div>
                <p className="font-medium text-richblack-25 text-[11px] sm:text-[13px] md:text-[14px] leading-snug">
                  {review?.review.split(" ").length > truncateWords
                    ? `${review?.review
                        .split(" ")
                        .slice(0, truncateWords)
                        .join(" ")} ...`
                    : `${review?.review}`}
                </p>
                <div className="flex items-center gap-1 sm:gap-2">
                  <h3 className="font-semibold text-yellow-100 text-[12px] sm:text-[14px]">
                    {review.rating.toFixed(1)}
                  </h3>
                  <ReactStars
                    count={5}
                    value={review.rating}
                    size={14}
                    edit={false}
                    activeColor="#ffd700"
                    emptyIcon={<FaStar />}
                    fullIcon={<FaStar />}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default ReviewSlider;
