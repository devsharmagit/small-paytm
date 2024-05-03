require('dotenv').config();
const express = require("express");
const { connectDB } = require("./db");
const rootRouter = require("./routes/index.js")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())

connectDB()

app.use("/api/v1/", rootRouter )

app.listen(process.env.PORT || 3500, ()=>{
    console.log("server is running!")
})