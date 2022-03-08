const router = require('express').Router()
const { addQuestion, findQuestions, findById, updateById } = require("../controller/question.controller")

router.post("/", addQuestion)
router.get("/", findQuestions)
router.get("/:id", findById)
router.put("/:id", updateById)

module.exports = router