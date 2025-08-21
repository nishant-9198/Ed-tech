import React from "react";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import TimelineImage from "../../../assets/Images/TimelineImage.png";

const timeline = [
  {
    Logo: Logo1,
    Heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo2,
    Heading: "Responsibility",
    Description: "Students will always be our top priority",
  },
  {
    Logo: Logo3,
    Heading: "Flexibility",
    Description: "The ability to switch is an important skills",
  },
  {
    Logo: Logo4,
    Heading: "Solve the problem",
    Description: "Code your way to a solution",
  },
];

const TimeLineSection = () => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-15 items-center">
        {/* Left side */}
        <div className="w-full lg:w-[45%] flex flex-col gap-5">
          {timeline.map((element, index) => (
            <div className="flex flex-row gap-6" key={index}>
              <div className="w-[50px] h-[50px] bg-white flex items-center justify-center">
                <img src={element.Logo} alt={`${element.Heading} logo`} />
              </div>
              <div>
                <h2 className="font-semibold text-[16px] sm:text-[18px]">
                  {element.Heading}
                </h2>
                <p className="text-sm sm:text-base">{element.Description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right side */}
        <div className="relative shadow-blue-200 w-full lg:w-auto">
          <img
            src={TimelineImage}
            alt="timeline"
            className="shadow-white object-cover w-full h-auto"
          />

          <div
            className="absolute bg-caribbeangreen-700 flex flex-col sm:flex-row 
                       text-white uppercase py-5 sm:py-7 px-5 sm:px-0
                       left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="flex flex-row gap-5 items-center border-b sm:border-b-0 sm:border-r border-caribbeangreen-300 px-0 sm:px-7 pb-3 sm:pb-0">
              <p className="text-2xl sm:text-3xl font-bold">10</p>
              <p className="text-caribbeangreen-300 text-xs sm:text-sm">
                Years of Experience
              </p>
            </div>

            <div className="flex flex-row gap-5 items-center px-0 sm:px-7 pt-3 sm:pt-0">
              <p className="text-2xl sm:text-3xl font-bold">250</p>
              <p className="text-caribbeangreen-300 text-xs sm:text-sm">
                Types of Courses
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLineSection;
