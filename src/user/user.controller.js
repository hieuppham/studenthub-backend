const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { getTagIdsByTagNames } = require('../question/question.controller')

module.exports = { addUser, findUsers, findById, updateById, updateInterestedTagById, deleteById }

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
                    createMany: {
                        data: await getTagIdsByTagNames(req.body.tags)
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
                InterestedTag: {
                    select: {
                        Tag: {
                            select: {
                                name: true
                            }
                        }
                    }
                },
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
        const user = await prisma.user.findUnique({
            where: {
                uid: req.params.uid
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
// not for updating interested tags
async function updateById(req, res) {
    try {
        const user = await prisma.user.update({
            where: {
                uid: req.params.uid
            },
            data: req.body
        })
        res.send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function updateInterestedTagById(req, res) {
    try {
        const uid = req.params.uid

        const user = await prisma.user.update({
            where: {
                uid: uid
            },
            data: {
                InterestedTag: {
                    deleteMany: {
                        userId: uid
                    },
                    createMany: {
                        data: await getTagIdsByTagNames(req.body.tags)
                    }
                }
            }
        })
        res.send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function deleteById(req, res) {
    try {
        const user = await prisma.user.delete({
            where: {
                uid: req.params.uid
            }
        })
        res.send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
}