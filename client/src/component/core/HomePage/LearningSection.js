import React from "react";
import HighlightText from "./HighlightText";
import know_your_progress from "../../../assets/Images/Know_your_progress.png";
import compare_with_others from "../../../assets/Images/Compare_with_others.png";
import plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png";
import CTAButton from "./Button.js";

const LearningSection = ({ text }) => {
  return (
    <div className="mt-[150px] mb-32">
      <div className="flex flex-col gap-5 items-center">
        {/* Heading */}
        <div className="text-4xl font-semibold text-center">
          Your Swiss Knife for
          <HighlightText text={" learning any language"} />
        </div>

        {/* Subtext */}
        <div className="text-richblack-600 text-center mx-auto text-base w-[70%] font-medium">
          Using spin making learning multiple languages easy. With 20+ languages,
          realistic voice-over, progress tracking, custom schedule and more.
        </div>

        {/* Images */}
        <div className="flex flex-row flex-wrap items-center justify-center mt-5 gap-4">
          <img
            src={know_your_progress}
            alt="Know Progress"
            className="object-contain w-[40%] sm:w-[35%] lg:w-auto lg:-mr-32"
          />
          <img
            src={compare_with_others}
            alt="Compare With Others"
            className="object-contain w-[40%] sm:w-[35%] lg:w-auto lg:-mb-10"
          />
          <img
            src={plan_your_lessons}
            alt="Plan Your Lesson"
            className="object-contain w-[40%] sm:w-[35%] lg:w-auto lg:-ml-36 lg:-mt-5"
          />
        </div>

        {/* CTA Button */}
        <div className="w-fit">
          <CTAButton active={true} linkto={"/signup"}>
            <div>Learn More</div>
          </CTAButton>
        </div>
      </div>
    </div>
  );
};

export default LearningSection;
