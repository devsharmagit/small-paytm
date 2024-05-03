const express = require("express")
const authRouter = require("./auth.js");
const userRouter = require("./user.js");
const accountRouter = require("./account.js")

const router = express.Router()

router.use("/auth",authRouter)

router.use("/user", userRouter)

router.use("/account", accountRouter)


module.exports =  router;
