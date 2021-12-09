const express = require("express")
const { loginAuth } = require("../controllers/authControllers")
const { test } = require("../controllers/testControllers")
const router = express.Router()

const { addUser, loginUser, checkAuth } = require("../controllers/userControllers")

router.post("/add-user", addUser)
router.post("/login-user", loginUser)
router.get("/check-auth", loginAuth, checkAuth)

router.post("/test", test)

module.exports = router 