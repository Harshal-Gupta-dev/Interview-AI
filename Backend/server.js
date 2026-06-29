const dotenv = require("dotenv")
dotenv.config()
const connectToDB = require("./src/config/db")


const app = require("./src/app")
app.listen(3000, () => {
    console.log("server is listening on port http://localhost:3000")
})

connectToDB()





