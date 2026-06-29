const express = require("express")
const app= express()
const cors = require("cors")

app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
const userAuth= require("../src/routes/auth.routes")
const interviewRouter = require("../src/routes/interview.routes")

// const userAuthMiddleware = require("./middlewares/auth.middlewares")
const cookieParser = require("cookie-parser")

app.use(cookieParser())
app.use('/api/auth',userAuth)
app.use("/api/interview", interviewRouter)







module.exports=app