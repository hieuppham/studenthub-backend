const router = require('express').Router()
const { addAnswer, updateAnswerById, deleteAnswerById, verifyAnswer } = require("./answer.controller")
const { updateAnswerScoreById } = require("./answer-voter.controller")
const { addAnswerComment, updateAnswerCommentById, deleteAnswerCommentById } = require("./answer-comment.controller")

router.post("/", addAnswer)
router.put("/:id", updateAnswerById)
router.delete("/:id", deleteAnswerById)
router.put("/verify/:id", verifyAnswer) //not test

router.put("/score/:id", updateAnswerScoreById)

router.post("/comments", addAnswerComment)
router.put("/comments/:id", updateAnswerCommentById)
router.delete("/comments/:id", deleteAnswerCommentById)

module.exports = router