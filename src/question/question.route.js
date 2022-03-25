const router = require('express').Router()
const { addQuestion, findQuestions, findQuestionById, updateQuestionById, deleteQuesionById } = require("./question.controller")
const { updateQuestionScoreById } = require('./question-voter.controller')
const { addQuestionComment, updateQuestionCommentById, deleteQuestionCommentById } = require("./question-comment.controller")
const { authorize } = require("../middlewares/firebase.middleware")

function getUid(req, res, next) {
    res.locals.uid = req.body.userId;
    next();
}

const authQueue = [getUid, authorize];

router.get("/", findQuestions)
router.get("/:id", findQuestionById)

router.post("/", authQueue, addQuestion)
router.put("/:id", authQueue, updateQuestionById)
router.delete("/:id", authQueue, deleteQuesionById)

router.put("/score/:id", authQueue, updateQuestionScoreById)

router.post("/comments", authQueue, addQuestionComment)
router.put("/comments/:id", authQueue, updateQuestionCommentById)
router.delete("/comments/:id", authQueue, deleteQuestionCommentById)

module.exports = router