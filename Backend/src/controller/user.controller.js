// const userModel = require("../models/user.model")
// const blacklistTokenModel = require("../models/blacklisttoken.model")
// const bcrypt = require("bcryptjs")
// const jwt = require("jsonwebtoken")



// /**
//  * @name userRegisterController
//  * @description Register Function which require username, email and password,
//  * @access public
//  */
// async function userRegisterController(req, res) {

//     const { username, email, password } = req.body

//     if (!username || !email || !password) {
//         return res.status(400).json({
//             message: "Please Enter Username, Email and Password"
//         })
//     }

//     const isUserAlreadyExist = await userModel.findOne({
//         $or: [{ username: username }, { email: email }]
//     })

//     if (isUserAlreadyExist) {
//         return res.status(400).json({
//             message: "User already Exist with Username or Email-Id"
//         })
//     }

//     const hash = await bcrypt.hash(password, 10)

//     const user = await userModel.create({
//         username: username,
//         email: email,
//         password: hash
//     })

//     const token = jwt.sign(
//         { id: user._id, username: username, email: email },
//         process.env.JWT_SECRET,
//         { expiresIn: "1d" }
//     )

//     res.cookie("token", token,cookieOptions)


//     res.status(200).json({
//         message: "User Created Successfully",
//         user: {
//             id: user._id,
//             username: username,
//             email: email

//         }
//     })
// }

// /**
//  * @name userLoginController
//  * @description login controller which require email and password to login
//  * @access public
//  */

// async function userLoginController(req, res) {
//     const { username, email, password } = req.body

//     const user = await userModel.findOne({
//         email
//     })

//     if (!user) {
//         return res.status(400).json({
//             message: "User didn't exist with this Email and Password"
//         })
//     }

//     const isPassvalid = await bcrypt.compare(password, user.password)

//     if (!isPassvalid) {
//         return res.status(400).json({
//             messgae: "Password is Incorrect"
//         })
//     }

    

//     const token = jwt.sign(
//         { id: user._id, username: username, email: email },
//         process.env.JWT_SECRET,
//         { expiresIn: "1d" }
//     )



//     res.cookie("token", token)

//     res.status(200).json({
//         message: "user Successfully LoggedIn",
//         user: {
//             id: user._id,
//             username: user.username,
//             email: user.email
//         }
//     }
//     )
// }



// /**
//  * @name logoutUserController
//  * @description Logout the user and add the token in tokenblacklistmodel
//  * @access public
//  */

// async function logoutUserController(req,res) {
//     const token = await  req.cookies?.token; 
//     // console.log(token)
//     if(token){
//         await blacklistTokenModel.create({
//             token:token
//         })
//     }
//     res.clearCookie("token")

//     res.status(200).json({
//         message:"User succesfully Loggedout"
//     })
    
// }

// /**
//  * @name get-me
//  * @description getting user info by token
//  * @access private
//  */

// async function getmeUserController(req,res) {
//     const user= await userModel.findById(req.user.id)

//     res.status(200).json({
//         message:"user info get successfully",
//         user:{
//             id:user._id,
//             username:user.username,
//             email:user.email
//         }
//     })  
// }


// module.exports = {
//     userRegisterController,
//     userLoginController,
//     logoutUserController,
//     getmeUserController
    
// }

const userModel = require("../models/user.model")
const blacklistTokenModel = require("../models/blacklisttoken.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const cookieOptions = {
    httpOnly: true,
    secure: true,        // required for cross-domain
    sameSite: "none",    // required for cross-domain
    maxAge: 24 * 60 * 60 * 1000  // 1 day
}

async function userRegisterController(req, res) {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({ message: "Please Enter Username, Email and Password" })
    }

    const isUserAlreadyExist = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    if (isUserAlreadyExist) {
        return res.status(400).json({ message: "User already Exist with Username or Email-Id" })
    }

    const hash = await bcrypt.hash(password, 10)
    const user = await userModel.create({ username, email, password: hash })

    const token = jwt.sign(
        { id: user._id, username, email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token, cookieOptions) // ✅ fixed

    res.status(200).json({
        message: "User Created Successfully",
        user: { id: user._id, username, email }
    })
}

async function userLoginController(req, res) {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(400).json({ // ✅ fixed typo
            message: "User didn't exist with this Email and Password"
        })
    }

    const isPassvalid = await bcrypt.compare(password, user.password)

    if (!isPassvalid) {
        return res.status(400).json({ message: "Password is Incorrect" })
    }

    const token = jwt.sign(
        { id: user._id, username: user.username, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token, cookieOptions) // ✅ fixed

    res.status(200).json({
        message: "user Successfully LoggedIn",
        user: { id: user._id, username: user.username, email: user.email }
    })
}

async function logoutUserController(req, res) {
    const token = req.cookies?.token
    if (token) {
        await blacklistTokenModel.create({ token })
    }
    res.clearCookie("token", cookieOptions) // ✅ pass same options when clearing

    res.status(200).json({ message: "User succesfully Loggedout" })
}

async function getmeUserController(req, res) {
    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message: "user info get successfully",
        user: { id: user._id, username: user.username, email: user.email }
    })
}

module.exports = {
    userRegisterController,
    userLoginController,
    logoutUserController,
    getmeUserController
}