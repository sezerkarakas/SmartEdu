const Category = require("../models/Category")

const createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body)

        res.status(201).json({
            status: "success",
            category
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error
        })
    }
}

const getCategories = async (req, res) => {
    try {
        const category = await Category.find({});

        res.status(200).json({
            status: "success",
            category
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            error
        })
    }
}

module.exports = {
    createCategory,
    getCategories
}