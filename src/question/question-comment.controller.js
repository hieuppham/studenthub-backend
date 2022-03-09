const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = { addComment, updateQuestionCommentById, deleteQuestionCommentById }

async function addComment(req, res) {
    try {
        const comment = await prisma.questionComment.create({
            data: {
                questionId: req.body.questionId,
                userId: req.body.userId,
                content: req.body.content
            },
            include: {
                User: {
                    select: {
                        displayName: true
                    }
                },
                Question: {
                    select: {
                        title: true
                    }
                }
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
            },
            include: {
                User: {
                    select: {
                        displayName: true
                    }
                },
                Question: {
                    select: {
                        title: true
                    }
                }
            }
        })

        res.send(comment)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function deleteQuestionCommentById(req, res) {
    try {
        await prisma.questionComment.delete({
            where: {
                id: Number(req.params.id)
            }
        })
        res.send({ message: 'ok' })
    } catch (error) {
        res.status(500).send(error.message)
    }
}