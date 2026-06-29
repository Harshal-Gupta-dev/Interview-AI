const dotenv = require("dotenv")
dotenv.config()
const connectToDB = require("./src/config/db")

const app = require("./src/app")
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running and listening on port ${PORT}`)
})

connectToDB()