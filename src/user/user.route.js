const router = require('express').Router()
const { addUser, findById, updateById, updateInterestedTagById, deleteById, findUsers } = require('./user.controller')

router.post("/", addUser)
router.get("/", findUsers)
router.get("/:uid", findById)
router.put("/:uid", updateById)
router.put("/tags/:uid", updateInterestedTagById)
router.delete("/:uid", deleteById)

module.exports = router