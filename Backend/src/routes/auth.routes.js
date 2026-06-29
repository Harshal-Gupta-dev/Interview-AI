const express= require("express")
const userAuthController= require("../controller/user.controller")
const userAuthMiddleware= require("../middlewares/auth.middlewares")
const userRouter= express.Router()

/**
 * @route POST api/auth/register 
 * @description Resgister new user
 * @access public
 */
userRouter.post('/register',userAuthController.userRegisterController)

/**
 * @route POST api/auth/login 
 * @description Login existing user
 * @access public
 */
userRouter.post('/login',userAuthController.userLoginController)

/**
 * @route GET api/auth/logout 
 * @description Logout existing user
 * @access public
 */
userRouter.get('/logout',userAuthController.logoutUserController)


/**
 * @name GET api/auth/get-me
 * @description getting logged in Userinfo
 * @access private
 */

userRouter.get('/get-me',userAuthMiddleware.authUser,userAuthController.getmeUserController)




module.exports=userRouter