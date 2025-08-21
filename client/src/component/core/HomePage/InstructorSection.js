import React from "react";
import Instructor from "../../../assets/Images/Instructor.png";
import HighlightText from "./HighlightText";
import CTAButton from "./Button";
import { FaArrowRight } from "react-icons/fa";

const InstructorSection = () => {
  return (
    <div className="mt-16">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-center">
        
        {/* Image Section */}
        <div className="w-full lg:w-[50%] flex justify-center">
          <img
            src={Instructor}
            alt="Instructor"
            className="shadow-[-20px_-20px_rgba(255,255,255)] max-w-[90%] lg:max-w-full"
          />
        </div>

        {/* Text Section */}
        <div className="w-full lg:w-[50%] flex flex-col gap-6 lg:gap-10 items-center lg:items-start text-center lg:text-left">
          <div className="text-3xl lg:text-4xl font-semibold w-[80%] lg:w-[50%]">
            Become an
            <HighlightText text={" Instructor"} />
          </div>

          <p className="font-medium text-[16px] text-richblack-300 w-[90%] lg:w-[80%]">
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </p>

          <div className="w-fit">
            <CTAButton active={true} linkto={"/signup"}>
              <div className="flex flex-row gap-2 items-center">
                Start Learning Today
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorSection;
