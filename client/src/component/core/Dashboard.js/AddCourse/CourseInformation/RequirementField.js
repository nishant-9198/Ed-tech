import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function RequirementsField({
  name,
  label,
  register,
  setValue,
  errors,
  getValues,
}) {


  const { editCourse, course } = useSelector((state) => state.course)
  // current req ki state
  const [requirement, setRequirement] = useState("")
  // list hogi ak jo add ho rahi hogi
  const [requirementsList, setRequirementsList] = useState([])


  useEffect(() => {
    // if (editCourse) {
    //   setRequirementsList(course?.instructions)
    // }
    // first render pe register karunga
     register(name, { required: true,
        })
   
  }, [])

  useEffect(() => {
    // jb jb value update ho rahi hai tb tb value set hogi
    setValue(name, requirementsList)
   
  }, [requirementsList])

  const handleAddRequirement = () => {
    // agr req hai to add karo list me aur fir current data ko empty 
    // kr do i.e jo input tag hoga
    if (requirement) {
      setRequirementsList([...requirementsList, requirement])
    //   setRequirement("")
    }
  }

  const handleRemoveRequirement = (index) => {
    // we use slice method to remove
    const updatedRequirements = [...requirementsList]
    updatedRequirements.splice(index, 1)
    setRequirementsList(updatedRequirements)
  }

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>
      <div className="flex flex-col items-start space-y-2">
        {/* input tag add kr diya on change pe value set kr di */}
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className="form-style w-full"
        />
        {/* button bna diya aur fir handleadd ko call kiya */}
        <button
          type="button"
          onClick={handleAddRequirement}
          className="font-semibold text-yellow-50"
        >
          Add
        </button>
      </div>
      {requirementsList.length > 0 && (
        <ul className="mt-2 list-inside list-disc">

          {requirementsList.map((requirement, index) => (
            <li key={index} className="flex items-center text-richblack-5">
              <span>{requirement}</span>
              <button
                type="button"
                className="ml-2 text-xs text-pure-greys-300 "
                onClick={() => handleRemoveRequirement(index)}
              >
                clear
              </button>
            </li>
          ))}
        </ul>
      )}
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>


  )
}
