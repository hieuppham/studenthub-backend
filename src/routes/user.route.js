const router = require('express').Router()
const { addUser, findById, updateById } = require('../controller/user.controller')

router.post("/", addUser)
router.get("/:id", findById)
router.put("/:id", updateById)

module.exports = router