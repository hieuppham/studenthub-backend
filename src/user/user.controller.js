const { PrismaClient } = require('@prisma/client')
const { search } = require('./user.route')
const prisma = new PrismaClient()

module.exports = { addUser, findUsers, findById, updateById, deleteById }

async function addUser(req, res) {
    try {
        const user = await prisma.user.create({
            data: {
                uid: req.body.uid,
                description: req.body.description,
                displayName: req.body.displayName,
                photoURL: req.body.photoURL,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                InterestedTag: {
                    create: {
                        userId: req.body.uid,
                        Tag: {
                            create: {
                                name: req.body.tag
                            }
                        }
                    }
                }
            }
        })
        res.status(201).send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

// find by name, email
async function findUsers(req, res) {
    try {
        const what = req.query.what
        const users = await prisma.user.findMany({
            where: {
                displayName: {
                    search: what
                },
                email: {
                    search: what
                }
            },
            include: {
                _count: {
                    select: {
                        Answer: true,
                        Question: true
                    }
                }
            }
        })
        res.send(users)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function findById(req, res) {
    try {
        const id = req.params.id
        const user = await prisma.user.findUnique({
            where: {
                uid: id
            },
            include: {
                Question: true,
                QuestionComment: true,
                Answer: true,
                AnswerComment: true
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
        const user = await prisma.user.update({
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

async function deleteById(req, res) {
    try {
        const id = req.params.id
        const user = await prisma.user.delete({
            where: {
                uid: id
            }
        })
        res.send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
}