const router = require('express').Router()
const { addUser, findById, updateById, deleteById } = require('./user.controller')

router.post("/", addUser)
router.get("/:id", findById)
router.put("/:id", updateById)
router.delete("/:id", deleteById)

module.exports = router