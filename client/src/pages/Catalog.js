import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import Footer from "../component/common/footer"
import CourseCard from "../component/core/Catalog/CourseCard"
import CourseSlider from "../component/core/Catalog/CourseSlider"
import { apiConnector } from "../services/apiconnector"
import { categories } from "../services/apis"
import { getCatalogPageData } from "../services/operations/pageAndComponentData"
import Error from "./Error"

function Catalog() {
  const { loading } = useSelector((state) => state.profile)
  const { catalogName } = useParams()
  const [active, setActive] = useState(1)
  const [catalogPageData, setCatalogPageData] = useState(null)
  const [categoryId, setCategoryId] = useState("")

  // Fetch all categories
  useEffect(() => {
    (async () => {
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        const category_id = res?.data?.data?.filter(
          (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
        )[0]._id
        setCategoryId(category_id)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
    })()
  }, [catalogName])

  // Fetch catalog page data
  useEffect(() => {
    if (categoryId) {
      (async () => {
        try {
          const res = await getCatalogPageData(categoryId)
          setCatalogPageData(res)
        } catch (error) {
          console.log(error)
        }
      })()
    }
  }, [categoryId])

  if (loading || !catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }
  if (!loading && !catalogPageData.success) {
    return <Error />
  }

  return (
    <>
      {/* Hero Section */}
      <div className="box-content bg-richblack-800 px-4">
        <div className="mx-auto flex min-h-[220px] md:min-h-[260px] max-w-full sm:max-w-maxContentTab lg:max-w-maxContent flex-col justify-center gap-4">
          <p className="text-xs sm:text-sm text-richblack-300">
            {`Home / Catalog / `}
            <span className="text-yellow-25">
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </p>
          <p className="text-2xl sm:text-3xl text-richblack-5">
            {catalogPageData?.data?.selectedCategory?.name}
          </p>
          <p className="max-w-[870px] text-sm sm:text-base text-richblack-200">
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>

      {/* Section 1 */}
      <div className="mx-auto box-content w-full max-w-full sm:max-w-maxContentTab lg:max-w-maxContent px-4 py-8 sm:py-12">
        <div className="section_heading text-lg sm:text-xl">
          Courses to get you started
        </div>
        <div className="my-4 flex flex-wrap border-b border-b-richblack-600 text-xs sm:text-sm">
          <p
            className={`px-2 sm:px-4 py-2 ${active === 1
              ? "border-b border-b-yellow-25 text-yellow-25"
              : "text-richblack-50"
              } cursor-pointer`}
            onClick={() => setActive(1)}
          >
            Most Popular
          </p>
          <p
            className={`px-2 sm:px-4 py-2 ${active === 2
              ? "border-b border-b-yellow-25 text-yellow-25"
              : "text-richblack-50"
              } cursor-pointer`}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>
        <div>
          <CourseSlider
            Courses={catalogPageData?.data?.selectedCategory?.course}
          />
        </div>
      </div>

      {/* Section 2 */}
      <div className="mx-auto box-content w-full max-w-full sm:max-w-maxContentTab lg:max-w-maxContent px-4 py-8 sm:py-12">
        <div className="section_heading text-lg sm:text-xl">
          Top courses in {catalogPageData?.data?.differentCategory?.name}
        </div>
        <div className="py-6 sm:py-8">
          <CourseSlider
            Courses={catalogPageData?.data?.differentCategory?.course}
          />
        </div>
      </div>

      {/* Section 3 */}
      {/* Section 3 */}
      {/* Section 3 */}
      <div className="mx-auto box-content w-full max-w-full sm:max-w-maxContentTab lg:max-w-maxContent px-4 py-8 sm:py-12">
        <div className="section_heading text-lg sm:text-xl">
          Frequently Bought
        </div>
        <div className="py-6 sm:py-8">
          <CourseSlider
            Courses={catalogPageData?.data?.mostSellingCourses?.slice(0, 6)}
          />
        </div>
      </div>




      <Footer />
    </>
  )
}

export default Catalog
