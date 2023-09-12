const bcrypt = require("bcrypt")
const User = require("../models/User")
const Category = require("../models/Category")
const Course = require("../models/Course")


const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body)

        res.status(201).redirect("/")
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error
        })
    }
}


const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {

        const user = await User.findOne({ email: email })
        if (user) {
            bcrypt.compare(password, user.password, (err, same) => {
                if (same) {
                    req.session.userID = user._id;
                    res.status(200).redirect("/users/dashboard")
                } else {
                    console.log("Kullanıcı adı veya şifre yanlış!")
                    res.redirect("/login")
                }
            })
        } else {
            console.log("Böyle bir kullanıcı bulunamadı!")
            res.redirect("/login")
        }
    } catch (error) {
        console.log(error)
    }
}

const logoutUser = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/")
    })
}

const getDashboardPage = async (req, res) => {
    try {

        const user = await User.findOne({ _id: req.session.userID }).populate("courses")
        const categories = await Category.find();
        const courses = await Course.find({ user: req.session.userID })
        console.log(courses)
        res.status(200).render("dashboard", {
            page_name: "dashboard",
            user,
            categories,
            courses
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createUser,
    loginUser,
    logoutUser,
    getDashboardPage
}