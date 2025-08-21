import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HighlightText from "./HighlightText";
import CourseCard from "./CourseCard";

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((courses) => courses.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Heading */}
      <div className="text-3xl sm:text-4xl font-semibold text-center px-2">
        Unlock the <HighlightText text={"Power of Code"} />
      </div>

      {/* Subtitle */}
      <p className="text-center text-richblack-300 text-[14px] sm:text-[16px] mt-3 px-3">
        Learn to build anything you can imagine
      </p>

      {/* Tabs */}
      <div className="flex flex-row flex-wrap justify-center gap-3 sm:gap-5 rounded-full bg-richblack-800 mb-5 mt-5 px-2 py-1 border-richblack-100">
        {tabsName.map((element, index) => {
          return (
            <div
              className={`text-[14px] sm:text-[16px] flex flex-row items-center gap-2
              ${
                currentTab === element
                  ? "bg-richblack-900 text-richblack-5 font-medium"
                  : "text-richblack-200"
              } 
              rounded-full transition-all duration-200 cursor-pointer
              hover:bg-richblack-900 hover:text-richblack-5 py-2 px-5 sm:px-7`}
              key={index}
              onClick={() => setMyCards(element)}
            >
              {element}
            </div>
          );
        })}
      </div>

      {/* Spacer for large screens */}
      <div className="hidden lg:block lg:h-[200px] h-auto"></div>

      {/* Cards Group */}
      <div className="lg:absolute flex flex-wrap justify-center lg:justify-between gap-6 sm:gap-10 w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black px-3 lg:px-0">
        {courses.map((element, index) => {
          return (
            <CourseCard
              key={index}
              cardData={element}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ExploreMore;
