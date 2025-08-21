import React from "react";
import { FooterLink2 } from "../../data/footer-links";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  return (
    <div className="bg-richblack-800">
      {/* Top section */}
      <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-start justify-between w-11/12 max-w-maxContent text-richblack-400 leading-6 mx-auto relative py-14 text-center sm:text-left">
        
        {/* Section 1 */}
        <div className="lg:w-[50%] flex flex-wrap justify-center sm:justify-between lg:border-r lg:border-richblack-700 gap-8">
          
          {/* Company */}
          <div className="w-full sm:w-[48%] lg:w-[30%] flex flex-col gap-3 items-center sm:items-start">
            <img src={Logo} alt="Logo" className="object-contain w-[140px]" />
            <h1 className="text-richblack-50 font-semibold text-[16px]">Company</h1>
            <div className="flex flex-col gap-2">
              {["About", "Careers", "Affiliates"].map((ele, i) => (
                <Link
                  key={i}
                  to={ele.toLowerCase()}
                  className="text-[14px] hover:text-richblack-50 transition-all duration-200"
                >
                  {ele}
                </Link>
              ))}
            </div>
            <div className="flex gap-3 text-lg">
              <FaFacebook />
              <FaGoogle />
              <FaTwitter />
              <FaYoutube />
            </div>
          </div>

          {/* Resources */}
          <div className="w-full sm:w-[48%] lg:w-[30%] flex flex-col items-center sm:items-start">
            <h1 className="text-richblack-50 font-semibold text-[16px]">Resources</h1>
            <div className="flex flex-col gap-2 mt-2">
              {Resources.map((ele, index) => (
                <Link
                  key={index}
                  to={ele.split(" ").join("-").toLowerCase()}
                  className="text-[14px] hover:text-richblack-50 transition-all duration-200"
                >
                  {ele}
                </Link>
              ))}
            </div>
            <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">Support</h1>
            <Link
              to="/help-center"
              className="text-[14px] hover:text-richblack-50 transition-all duration-200 mt-2"
            >
              Help Center
            </Link>
          </div>

          {/* Plans */}
          <div className="w-full sm:w-[48%] lg:w-[30%] flex flex-col items-center sm:items-start">
            <h1 className="text-richblack-50 font-semibold text-[16px]">Plans</h1>
            <div className="flex flex-col gap-2 mt-2">
              {Plans.map((ele, index) => (
                <Link
                  key={index}
                  to={ele.split(" ").join("-").toLowerCase()}
                  className="text-[14px] hover:text-richblack-50 transition-all duration-200"
                >
                  {ele}
                </Link>
              ))}
            </div>
            <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">Community</h1>
            <div className="flex flex-col gap-2 mt-2">
              {Community.map((ele, index) => (
                <Link
                  key={index}
                  to={ele.split(" ").join("-").toLowerCase()}
                  className="text-[14px] hover:text-richblack-50 transition-all duration-200"
                >
                  {ele}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="lg:w-[50%] flex flex-wrap justify-center sm:justify-between gap-8">
          {FooterLink2.map((ele, i) => (
            <div key={i} className="w-full sm:w-[48%] lg:w-[30%] flex flex-col items-center sm:items-start">
              <h1 className="text-richblack-50 font-semibold text-[16px]">{ele.title}</h1>
              <div className="flex flex-col gap-2 mt-2">
                {ele.links.map((link, index) => (
                  <Link
                    key={index}
                    to={link.link}
                    className="text-[14px] hover:text-richblack-50 transition-all duration-200"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom section */}
      <div className="flex flex-col lg:flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-400 mx-auto pb-14 text-sm gap-4 text-center lg:text-left">
        <div className="flex flex-wrap justify-center lg:justify-start">
          {BottomFooter.map((ele, i) => (
            <div
              key={i}
              className={`px-3 ${
                BottomFooter.length - 1 !== i
                  ? "border-r border-richblack-700"
                  : ""
              } hover:text-richblack-50 transition-all duration-200`}
            >
              <Link to={ele.split(" ").join("-").toLowerCase()}>{ele}</Link>
            </div>
          ))}
        </div>
        <div className="text-center">Made with ❤️ Nishant © 2023 Studynotion</div>
      </div>
    </div>
  );
};

export default Footer;
