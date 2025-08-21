const Category = require("../models/Category");
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}
// create tag ka handler function
exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        // check whether these are present or not
        if (!name || !description) {
            return res.status(400).json({
                success: true,
                message: "All fields are required"
            })
        }

        //create details in db
        const categoryDetails = await Category.create({
            name: name,
            description: description,
        });
        console.log(categoryDetails);

        return res.status(200).json({
            success: true,
            message: "Category Created Successfully",
            categoryDetails,
        })




    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })

    }
};

//getall tag handler function
exports.showAllCategory = async (req, res) => {
    try {
        const allCategorys = await Category.find().populate("course")

        res.status(200).json({
            success: true,
            data: allCategorys,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

//categoryPageDetails

exports.categoryPageDetail = async (req, res) => {
    try {
        //get category id
        const { categoryId } = req.body;

        // get courses for specified category
        const selectedCategory = await Category.findById(categoryId)
            .populate({
                path: "course",
                match: { status: "Published" },
                populate: "ratingAndReviews",
            })
            .exec();
        //validation
        if (!selectedCategory) {
            return res.status(404).json({
                success: false,
                message: "Date Not Found",
            });
        }

        if (selectedCategory.course.length === 0) {
            console.log("No courses found for the selected category.")
            return res.status(404).json({
                success: false,
                message: "No courses found for the selected category.",
            })
        }
        const categoriesExceptSelected = await Category.find({
            _id: { $ne: categoryId },
        })
        let differentCategory = await Category.findOne(
            categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
                ._id
        )
            .populate({
                path: "course",
                match: { status: "Published" },
                populate: "ratingAndReviews",
            })
            .exec()
        //get top selling

        const allCategories = await Category.find()
            .populate({
                path: "course",
                match: { status: "Published" },
                populate:"instructor",
                populate: "ratingAndReviews",
            })
            .exec()
        const allCourses = allCategories.flatMap((category) => category.course)
        const mostSellingCourses = allCourses
            .sort((a, b) => b.sold - a.sold)
            .slice(0, 10)

        // return re
        return res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategory,
                mostSellingCourses,
            }
        });

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

