process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const { describe, before, it } = require('mocha')
const server = require('../../server')
const users = require('./user.data.test')
chai.use(chaiHttp)

describe('Users', () => {

    describe("/delete /api/users", () => {
        it('it should delete all users', (done) => {
            users.forEach(user => {
                chai.request(server)
                    .delete('/api/users', +user.uid)
                    .end((err, res) => {})
            })
            done()
        })
    })

    describe("/post /api/users", () => {
        it("it should add all users", (done) => {
            users.forEach(user => {
                chai.request(server)
                    .post('/api/users')
                    .send(user)
                    .end((err, res) => {})
            })
            done()
        })
    })

    describe("put /api/users", () => {
        it("it should update all users", (done) => {
            done()
        })
    })

})