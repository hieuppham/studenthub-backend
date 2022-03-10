const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = { addAnswer, updateAnswerById, deleteAnswerById, verifyAnswer }

async function addAnswer(req, res) {
    try {
        const answer = await prisma.answer.create({
            data: {
                questionId: req.body.questionId,
                userId: req.body.userId,
                content: req.body.content
            }
        })
        res.status(201).send(answer)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function updateAnswerById(req, res) {
    try {
        const answer = await prisma.answer.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                content: req.body.content
            }
        })
        res.send(answer)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function deleteAnswerById(req, res) {
    try {
        const answer = await prisma.answer.delete({
            where: {
                id: Number(req.params.id)
            }
        })

        const result = { message: answer ? `Deleted answer ${answer.id}` : "fail" }
        res.send(result)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function verifyAnswer(req, res) {
    try {
        const answer = await prisma.answer.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                verify: req.body.verify
            }
        })
        res.send(answer)
    } catch (error) {
        res.status(500).send(error.message)
    }
}