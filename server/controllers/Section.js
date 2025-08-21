const Section = require("../models/Section");
const Course = require("../models/Course");


exports.createSection = async (req, res) => {
    try {
        // data fetch
        const { sectionName, courseId } = req.body;
        //data validation
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: 'Missing Properties',
            });
        }

        //craete section
        const newSection = await Section.create({ sectionName });

        //update course with section objectid
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    courseContent: newSection._id,
                }
            },   
            { new: true },
        )
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec()

        // use populate to replace section /subsection both in the updatedCourseDetails
        // return response
        return res.status(200).json({
            success: true,
            message: "Section created successfully",
            updatedCourseDetails,
        })

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to create section please try again",
            error: error.message,

        })

    }
}

// UPDATE a section
exports.updateSection = async (req, res) => {
    try {
        const { sectionName, sectionId, courseId } = req.body
        const section = await Section.findByIdAndUpdate(
            sectionId,
            { sectionName },
            { new: true }
        )
        const course = await Course.findById(courseId)
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec()
        // console.log(course)
        res.status(200).json({
            success: true,
            message: section,
            data: course,
        })
    } catch (error) {
        console.error("Error updating section:", error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}

exports.deleteSection = async (req, res) => {
    try {
        //fetch the data i.e id from parameter
        const { sectionId, courseId } = req.body
        //assuming we are sendind id in parameter
        //delete the data by finding id
        await Section.findByIdAndDelete(sectionId);
        // todo:do we need to delete the enetry from course schema
        // Remove section reference from the course document
        await Course.findByIdAndUpdate(courseId, {
            $pull: { courseContent: sectionId },
        });
        // return res

        // find the updated course and return it
        const course = await Course.findById(courseId)
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                }, 
            })
            .exec()

        res.status(200).json({
            success: true,
            message: "Section deleted",
            data: course,
        })


    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to delete section please try again",
            error: error.message,

        })
    }
}