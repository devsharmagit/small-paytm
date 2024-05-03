const express = require("express");
const { userUpdateInfo, getUsers } = require("../controller/user");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router()

router.put("/",authMiddleware, userUpdateInfo)

router.get("/", authMiddleware, getUsers)

module.exports = router