const router = require('express').Router()
const { addQuestion, findQuestions, findQuestionById, updateQuestionById, deleteQuesionById } = require("./question.controller")
const { updateQuestionScoreById } = require('./question-voter.controller')
const { addQuestionComment, updateQuestionCommentById, deleteQuestionCommentById } = require("./question-comment.controller")

router.post("/", addQuestion)
router.get("/", findQuestions)
router.get("/:id", findQuestionById)
router.put("/:id", updateQuestionById)
router.delete("/:id", deleteQuesionById)

router.put("/score/:id", updateQuestionScoreById)

router.post("/comments", addQuestionComment)
router.put("/comments/:id", updateQuestionCommentById)
router.delete("/comments/:id", deleteQuestionCommentById)

module.exports = router