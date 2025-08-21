// InstructorChart.jsx
import { useState, useEffect } from "react"
import { Chart, registerables } from "chart.js"
import { Pie } from "react-chartjs-2"

Chart.register(...registerables)

export default function InstructorChart({ courses }) {
  const [currChart, setCurrChart] = useState("students")
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const generateRandomColors = (numColors) => {
    return Array.from({ length: numColors }, () =>
      `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`
    )
  }

  const baseColors = generateRandomColors(courses.length)

  const chartData = (key) => ({
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course[key]),
        backgroundColor: baseColors,
      },
    ],
  })

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: isMobile ? "bottom" : "top",
        labels: {
          boxWidth: 15,
          font: { size: 12 },
          padding: 10,
        },
      },
    },
    layout: { padding: 10 },
  }

  return (
    <div className="flex flex-col gap-4 rounded-md bg-richblack-800 p-4 sm:p-6">
      <p className="text-lg font-bold text-richblack-5">Visualize</p>

      <div className="flex flex-wrap gap-2 font-semibold">
        <button
          onClick={() => setCurrChart("students")}
          className={`rounded-sm px-3 py-1 transition-all duration-200 ${
            currChart === "students"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Students
        </button>
        <button
          onClick={() => setCurrChart("income")}
          className={`rounded-sm px-3 py-1 transition-all duration-200 ${
            currChart === "income"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Income
        </button>
      </div>

      <div className="relative mx-auto aspect-square w-full max-w-[400px]">
        <Pie
          data={
            currChart === "students"
              ? chartData("totalStudentsEnrolled")
              : chartData("totalAmountGenerated")
          }
          options={options}
        />
      </div>
    </div>
  )
}
