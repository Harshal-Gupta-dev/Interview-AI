const express = require("express")
const app = express()
const cors = require("cors")
const cookieParser = require("cookie-parser") 


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser()) 


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))


const userAuth = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")

app.use('/api/auth', userAuth)
app.use("/api/interview", interviewRouter)

module.exports = app