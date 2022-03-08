const express = require('express')
const app = express()

const user = require('./src/routes/user.route')
const question = require("./src/routes/question.route")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/users", user)
app.use("/api/questions", question)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))