import React from "react"

import Footer from "../component/common/footer"

import ContactDetails from "../component/core/ContactPage/ContactDetails"
import ContactForm from "../component/core/ContactPage/ContactForm"
import ReviewSlider from "../component/common/ReviewSlider"


const Contact = () => {
  return (
    <div >
      <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
        <div className="lg:w-[40%]">
          <ContactDetails />
        </div>
        <div className="lg:w-[60%]">
          <ContactForm />
        </div>

      </div>

      <div className="w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 bg-richblack-900 text-white mb-20 sm:mb-28 lg:mb-32 px-3">

        <h2 className="text-2xl sm:text-3xl lg:text-4xl text-center font-semibold mt-6 sm:mt-10">
          Review from other Learners
        </h2>
        <ReviewSlider/>
      </div>
      <Footer />
    </div>
  )
}

export default Contact
