const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = { addQuestion, findQuestions, findQuestionById, updateQuestionById, deleteQuesionById }

async function addQuestion(req, res) {
    try {

        const question = await prisma.question.create({
            data: {
                userId: req.body.userId,
                title: req.body.title,
                content: req.body.content,
                TagsOnQuestions: {
                    createMany: {
                        data: await getTagIdsByTagNames(req.body.tags)
                    }
                }
            }
        })
        res.status(201).send(question)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function findQuestions(req, res) {
    try {
        const what = req.query.what
        const tags = req.query.tags ? { OR: req.query.tags.split(',').map(tag => new Object({ name: tag })) } : {}

        const questions = await prisma.question.findMany({
            include: {
                TagsOnQuestions: {
                    select: {
                        Tag: {
                            select: {
                                name: true
                            }
                        }
                    }
                },
                User: {
                    select: {
                        uid: true,
                        displayName: true,
                        reputation: true
                    }
                },
                _count: {
                    select: {
                        Answer: true
                    }
                }
            },
            where: {
                AND: [{
                        deleted: false
                    },
                    {
                        title: {
                            search: what
                        },
                        content: {
                            search: what
                        },
                        TagsOnQuestions: {
                            some: {
                                Tag: tags
                            }
                        }

                    }
                ]

            },
            orderBy: {
                //use only one argument
                createdAt: req.query.createdAt,
                score: req.query.score
            }
        })

        res.send(questions)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function findQuestionById(req, res) {
    try {
        const id = Number(req.params.id)
        const question = await prisma.question.findMany({
            where: {
                id: id,
                deleted: false
            },
            include: {
                User: true,
                Answer: {
                    include: {
                        AnswerComment: {
                            include: {
                                User: {
                                    select: {
                                        uid: true,
                                        displayName: true
                                    }
                                }
                            },
                        },
                        AnswerVoter: {
                            select: {
                                userId: true,
                                state: true
                            }
                        }
                    },
                    where: {
                        deleted: false
                    }
                },
                QuestionComment: {
                    include: {
                        User: {
                            select: {
                                uid: true,
                                displayName: true
                            }
                        },
                    }
                },
                QuestionVoter: {
                    select: {
                        userId: true,
                        state: true
                    }
                },
                TagsOnQuestions: {
                    select: {
                        Tag: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        })
        res.send(question)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function updateQuestionById(req, res) {
    try {
        const id = Number(req.params.id)

        const question = await prisma.question.update({
            where: {
                id: id
            },
            data: {
                title: req.body.title,
                content: req.body.content,
                TagsOnQuestions: {
                    deleteMany: {
                        questionId: id
                    },
                    createMany: {
                        data: await getTagIdsByTagNames(req.body.tags)
                    }
                }
            }
        })

        res.send(question)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function deleteQuesionById(req, res) {
    try {
        const id = Number(req.params.id)
        const question = await prisma.question.update({
            where: {
                id: id
            },
            data: {
                deleted: true
            }
        })
        res.send(question)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

// Creat new tag if not exists and get all id 
async function getTagIdsByTagNames(tagNames) {
    try {
        const existTags = await prisma.tag.findMany({
            where: {
                name: { in: tagNames }
            }
        })
        let tagIds = existTags.map(tag => new Object({ tagId: tag.id }))

        const existTagsName = existTags.map(tag => tag.name)
        const newTagsName = tagNames.filter(name => !existTagsName.includes(name))

        for (let i = 0; i < newTagsName.length; i++) {
            const newTag = await prisma.tag.create({
                data: {
                    name: newTagsName[i]
                }
            })
            tagIds.push(new Object({ tagId: newTag.id }))
        }

        return tagIds
    } catch (error) {
        console.error(error);
    }
}