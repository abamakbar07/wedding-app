const express = require("express")
const { loginAuth } = require("../controllers/authControllers")
const router = express.Router()

const { addUser, loginUser, checkAuth } = require("../controllers/userControllers")

router.post("/add-user", addUser)
router.post("/login-user", loginUser)
router.get("/check-auth", loginAuth, checkAuth)

module.exports = router 