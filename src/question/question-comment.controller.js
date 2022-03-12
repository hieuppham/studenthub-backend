const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = { addQuestionComment, updateQuestionCommentById, deleteQuestionCommentById }

async function addQuestionComment(req, res) {
    try {
        const comment = await prisma.questionComment.create({
            data: {
                questionId: req.body.questionId,
                userId: req.body.userId,
                content: req.body.content
            }
        })
        res.status(201).send(comment)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function updateQuestionCommentById(req, res) {
    try {
        const comment = await prisma.questionComment.update({
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

async function deleteQuestionCommentById(req, res) {
    try {
        const question = await prisma.questionComment.delete({
            where: {
                id: Number(req.params.id)
            }
        })
        const result = { message: question ? `Deleted commnent ${req.params.id} of question ${question.id}` : "fail" }
        res.send(result)
    } catch (error) {
        res.status(500).send(error.message)
    }
}