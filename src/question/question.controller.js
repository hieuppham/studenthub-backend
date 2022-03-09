const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = { addQuestion, findQuestions, findById, updateById, deleteById }

async function addQuestion(req, res) {
    try {

        const question = await prisma.question.create({
            data: {
                userId: req.body.userId,
                title: req.body.title,
                content: req.body.content,
                TagsOnQuestions: {
                    createMany: {
                        data: await getTagsId(req.body.tags)
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

    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function findById(req, res) {
    try {
        const id = Number(req.params.id)
        const question = await prisma.question.findUnique({
            where: {
                id: id
            },
            include: {
                User: true,
                Answer: {
                    select: {
                        AnswerComment: true,
                        AnswerVoter: true
                    }
                },
                QuestionComment: true,
                QuestionVoter: true,
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
//TODO: update tags
async function updateById(req, res) {
    try {
        const id = Number(req.params.id)
        const question = await prisma.question.update({
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

async function deleteById(req, res) {
    try {
        const id = Number(req.params.id)
        const question = await prisma.question.delete({
            where: {
                id: id
            }
        })
        const result = question ? { message: 'ok' } : null
        res.send(result)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

// Creat new tag if not exists and get all id 
async function getTagsId(tagsName) {
    try {
        const existTags = await prisma.tag.findMany({
            where: {
                name: { in: tagsName }
            }
        })
        let tagsId = existTags.map(tag => { tagId: tag.id })
        const existTagsName = existTags.map(tag => tag.name)

        const newTagsName = tagsName.filter(name => !existTagsName.includes(name))

        for (let i = 0; i < newTagsName.length; i++) {
            const newTag = await prisma.tag.create({
                data: {
                    name: newTagsName[i]
                }
            })
            tagsId.push({ tagId: newTag.id })
        }
        return tagsId
    } catch (error) {
        console.error(error);
    }
}