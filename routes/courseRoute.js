const express = require("express")
const courseController = require("../controllers/courseController")
const roleMiddleware = require("../middlewares/roleMiddleware")

const router = express.Router()

router.post("/", roleMiddleware(["teacher", "admin"]), courseController.createCourse)
router.get("/", courseController.getCourses)
router.get("/:slug", courseController.getCourse)
router.post("/enroll", courseController.enrollCourse)
router.post("/release", courseController.releaseCourse)

module.exports = router