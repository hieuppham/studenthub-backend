process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')

const server = require('../../server')
const questions = require('../question/question.data.test')
const { PrismaClient } = require('@prisma/client')
const assert = chai.assert

const prisma = new PrismaClient()
require('../user/user.controller.test')

chai.use(chaiHttp)

describe('Questions', () => {

    describe("/post /api/questions", () => {
        it('it should add all questions', done => {
            questions.forEach(question => {
                chai.request(server)
                    .post('/api/questions')
                    .send(question)
                    .end((err, res) => {})
            })
            done()
        })
    })

    describe('/get /api/questions', () => {
        it('it should get all questions', (done) => {
            chai.request(server)
                .get("/api/questions")
                .end((err, res) => {})
            done()
        })
    })

    describe('/delete /api/questions/:id', () => {
        it('it should hiden all questions', (done) => {
            prisma.question.findMany().then(questions => {
                var questionIds = questions.map(question => question.id)
                questionIds.forEach(id => {
                    chai.request(server)
                        .delete('/api/questions/' + id)
                        .end((err, res) => {
                            assert.equal(true, res.body.deleted)
                        })
                })
                done()
            })
        })
    })

    server.close()
})