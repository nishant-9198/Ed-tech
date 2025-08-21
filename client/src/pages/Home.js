import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from '../component/core/HomePage/HighlightText.js';
import CTAButton from "../component/core/HomePage/Button.js";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../component/core/HomePage/CodeBlocks.js";
import TimeLineSection from "../component/core/HomePage/TimeLineSection.js";
import LearningSection from "../component/core/HomePage/LearningSection.js";
import InstructorSection from "../component/core/HomePage/InstructorSection.js";
import Footer from "../component/common/footer.js";
import ExploreMore from "../component/core/HomePage/ExploreMore.js";
import ReviewSlider from "../component/common/ReviewSlider.js";

const Home = () => {
  return (
    <div>
      {/* Section 1 */}
      <div className="relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between">

        {/* Button */}
        <Link to={"/signup"}>
          <div className="group mt-10 sm:mt-16 p-1 rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit">
            <div className="flex flex-row items-center gap-2 rounded-full px-5 sm:px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
              <p className="text-sm sm:text-base">Become an instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        {/* Title */}
        <div className="mt-6 sm:mt-7 text-center text-2xl sm:text-3xl lg:text-4xl font-semibold px-3">
          Empower Your Future With
          <HighlightText text={"Coding Skill"} />
        </div>

        {/* Subtitle */}
        <div className="mt-3 sm:mt-4 w-full sm:w-[85%] lg:w-[75%] text-center text-sm sm:text-lg font-bold text-richblack-300 px-3">
          With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-7 mt-6 sm:mt-8">
          <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
          <CTAButton active={false} linkto={"/login"}>Book a Demo</CTAButton>
        </div>

        {/* Video */}

        {/* Video */}
        <div className="flex justify-center my-7 px-4 sm:px-6">
          <div className="shadow-[10px_-5px_50px_-5px] shadow-blue-200 w-full sm:w-[85%] lg:w-[75%] rounded-md">
            <video
              loop
              muted
              autoPlay
              className="w-full rounded-md shadow-[20px_20px_rgba(255,255,255,0.6)]"
            >
              <source src={Banner} type="video/mp4" />
            </video>
          </div>
        </div>




        {/* Code section 1 */}
        <CodeBlocks
          position={"lg:flex-row"}
          heading={
            <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold px-3">
              Unlock your <HighlightText text={"coding potential "} /> with our online course
            </div>
          }
          subheading={
            "With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources,including hands-on projects, quizzes, and personalized feedback from instructors."
          }
          ctabtn1={{ btnText: "Try it Yourself", linkto: "/signup", active: true }}
          ctabtn2={{ btnText: "Learn More", linkto: "/login", active: false }}
          codeblock={`<!DOCTYPE html> \n<html lang="en"> \n<head> \n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
          codeColor={"text-yellow-25"}
          backgroundGradient={<div className="codeblock1 absolute"></div>}
        />

        {/* Code section 2 */}
        <CodeBlocks
          position={"lg:flex-row-reverse"}
          heading={
            <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold px-3">
              Start <HighlightText text={"coding in second"} />
            </div>
          }
          subheading={
            "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
          }
          ctabtn1={{ btnText: "Continue Lesson", linkto: "/signup", active: true }}
          ctabtn2={{ btnText: "Learn More", linkto: "/login", active: false }}
          codeblock={`<!DOCTYPE html> \n<html lang="en"> \n<head> \n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
          codeColor={"text-yellow-25"}
          backgroundGradient={<div className="codeblock2 absolute bg-blue-100"></div>}
        />

        {/* Footer section of section one */}
        <ExploreMore />
      </div>

      {/* Section 2 */}
      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[180px] sm:h-[250px] lg:h-[333px]">
          <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-center gap-5 mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-7 text-white items-center mt-14 sm:mt-28 lg:mt-40">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-3 text-sm sm:text-base">
                  Explore Full Catalog <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/signup"}>
                <div className="flex items-center gap-3 text-sm sm:text-base">Learn More</div>
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7">
          <div className="flex flex-col lg:flex-row gap-5 mb-10 mt-10 lg:mt-[95px] lg:ml-20">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold w-full lg:w-[45%] text-center lg:text-left px-3">
              Get the Skills you need for a <HighlightText text={'Job that is in demand'} />
            </div>
            <div className="flex flex-col gap-6 sm:gap-10 w-full lg:w-[40%] items-center lg:items-start px-3">
              <div className="text-sm sm:text-base text-center lg:text-left">
                The modern StudyNotion dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
              </div>
              <CTAButton active={true} linkto={"/signup"}>
                <div>Learn more</div>
              </CTAButton>
            </div>
          </div>

          <TimeLineSection />
          <LearningSection />
        </div>
      </div>

      {/* Section 3 */}
      <div className="w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 bg-richblack-900 text-white mb-20 sm:mb-28 lg:mb-32 px-3">
        <InstructorSection />
        <h2 className="text-2xl sm:text-3xl lg:text-4xl text-center font-semibold mt-6 sm:mt-10">
          Review from other Learners
        </h2>
        <ReviewSlider />
      </div>

      {/* Section 4 */}
      <Footer />
    </div>
  );
};

export default Home;
