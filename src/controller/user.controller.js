const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = { addUser, findById, updateById }

async function addUser(req, res) {
    try {
        const user = await prisma.users.create({
            data: req.body
        })
        res.send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function findUsers(req, res) {
    try {

    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function findById(req, res) {
    try {
        const id = req.params.id
        const user = await prisma.users.findUnique({
            where: {
                uid: id
            },
            include: {
                questions_questions_user_idTousers: true,
                question_comment_question_comment_user_idTousers: true,
                answers_answers_user_idTousers: true,
                answer_comment_answer_comment_user_idTousers: true
            }
        })
        res.send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function updateById(req, res) {
    try {
        const id = req.params.id
        const user = await prisma.users.update({
            where: {
                uid: id
            },
            data: req.body
        })
        res.send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
}