import React from "react";
import { Link } from "react-router-dom";
import HighlightText from "./HighlightText";
import CTAButton from "../HomePage/Button";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroundGradient,
  codeColor
}) => {
  return (
    <div
      className={`flex flex-col ${position} my-10 sm:my-20 justify-between lg:gap-10 gap-6 sm:gap-10`}
    >
      {/* Section 1 */}
      <div className="w-full lg:w-[50%] flex flex-col gap-4 sm:gap-8 text-center lg:text-left px-2 sm:px-0">
        {heading}
        <div className="font-bold text-richblack-300 text-sm sm:text-base">
          {subheading}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-7 mt-5 sm:mt-7 justify-center lg:justify-start">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className="flex gap-2 items-center">
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>
          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/* Section 2 */}
      <div className="h-fit code-border flex flex-row py-3 text-[9px] sm:text-[10px] md:text-sm leading-[16px] sm:leading-[18px] md:leading-6 relative w-full lg:w-[470px] overflow-x-auto rounded-md">
        {/* BG gradient */}
        {backgroundGradient}

        {/* Line numbers */}
        <div className="text-center flex flex-col w-[10%] min-w-[30px] text-richblack-400 font-inter font-bold">
          {Array.from({ length: 11 }, (_, i) => (
            <p key={i}>{i + 1}</p>
          ))}
        </div>

        {/* Code block */}
        <div
          className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}
        >
          <TypeAnimation
            sequence={[codeblock, 5000, ""]}
            repeat={Infinity}
            cursor={true}
            style={{
              whiteSpace: "pre-line",
              display: "block"
            }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;
