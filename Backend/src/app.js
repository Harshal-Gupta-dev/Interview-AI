const express = require("express")
const app = express()
const cors = require("cors")
const cookieParser = require("cookie-parser")

// 1. Data & Cookie Parsers (Must be at the very top)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// 2. Global CORS Implementation (Handles GET, POST, OPTIONS preflights out-of-the-box)
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true,                
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"]
}))

// 3. Route Handling Mapping
const userAuth = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")

app.use('/api/auth', userAuth)
app.use("/api/interview", interviewRouter)

module.exports = app