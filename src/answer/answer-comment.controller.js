const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = { addAnswerComment, updateAnswerCommentById, deleteAnswerCommentById }

async function addAnswerComment(req, res) {
    try {
        const comment = await prisma.answerComment.create({
            data: {
                answerId: req.body.answerId,
                userId: req.body.userId,
                content: req.body.content
            }
        })
        res.status(201).send(comment)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function updateAnswerCommentById(req, res) {
    try {
        const comment = await prisma.answerComment.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                content: req.body.content
            }
        })
        res.send(comment)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function deleteAnswerCommentById(req, res) {
    try {
        const comment = await prisma.answerComment.delete({
            where: {
                id: Number(req.params.id)
            }
        })
        const result = { message: comment ? `Deleted comment ${req.params.id} of answer ${comment.answerId}` : "fail" }
        res.send(result)
    } catch (error) {
        res.status(500).send(error.message)
    }
}