import { useEffect } from "react"
import { VscAdd } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setCourse } from "../../../slices/courseSlice"
import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI"
import IconBtn from "../../common/IconBtn"
import CoursesTable from "./InstructorCourses/CourseTable"
   
export default function MyCourses() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token)
      console.log("Printing instructor courses",result);
      if (result) {
        dispatch(setCourse(result))  // ✅ Fix here
      }
    }
    fetchCourses()
  }, [token, dispatch])

  return (
    <div> 
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-richblack-5">My Courses</h1>
        <IconBtn
          text="Add Course"
          onclick={() => navigate("/dashboard/add-course")}
        >
          <VscAdd />
        </IconBtn>
      </div>
      
      {course && <CoursesTable courses={course} setCourses={(val) => dispatch(setCourse(val))} />}
    </div>
  )
}
