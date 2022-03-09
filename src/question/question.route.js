const router = require('express').Router()
const { addQuestion, findQuestions, findById, updateById, deleteById } = require("./question.controller")

router.post("/", addQuestion)
router.get("/", findQuestions)
router.get("/:id", findById)
router.put("/:id", updateById)
router.delete("/:id", deleteById)

module.exports = router