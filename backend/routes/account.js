const express = require("express")
const { authMiddleware } = require("../middleware/auth")
const { getBalance, transfer } = require("../controller/account")

const router = express.Router()

router.get('/balance', authMiddleware, getBalance)
router.post('/transfer', authMiddleware, transfer)

module.exports = router