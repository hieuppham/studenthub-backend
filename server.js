const express = require('express')
const app = express()

const user = require('./src/user/user.route')
const question = require("./src/question/question.route")
const answers = require("./src/answer/answer.route")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/users", user)
app.use("/api/questions", question)
app.use("/api/answers", answers)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))