const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = { addQuestion, findQuestions, findById, updateById }

async function addQuestion(req, res) {
    try {
        const question = await prisma.questions.create({
            data: req.body
        })
        res.send(question)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function findQuestions(req, res) {
    try {

    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function findById(req, res) {
    try {
        const id = Number(req.params.id)
        const question = await prisma.questions.findUnique({
            where: {
                id: id
            },
            include: {
                answers: true
            }
        })
        res.send(question)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function updateById(req, res) {
    try {
        const id = Number(req.params.id)
        const question = await prisma.questions.update({
            where: {
                id: id
            },
            data: req.body
        })
        res.send(question)
    } catch (error) {
        res.status(500).send(error.message)
    }
}