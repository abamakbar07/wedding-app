const express = require("express")
const router = express.Router()

const { addUser } = require("../controllers/userControllers")

router.post("/add-user", addUser)

module.exports = router 