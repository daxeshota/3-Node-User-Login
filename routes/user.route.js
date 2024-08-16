const express = require("express")
const { register } = require("../controllers/user/register")
const { login } = require("../controllers/user/login")
const { forgotPassword } = require("../controllers/user/forgotPassword")
const { getAllUsers } = require("../controllers/user/getAllUsers")
const { userDashboard } = require("../controllers/user/userDashboard")
const { auth } = require("../middleware/auth")
const resetPassword = require("../controllers/user/resetPassword")
const userRoute = express.Router()

userRoute.post("/register", register)
userRoute.post("/login", login)
userRoute.post("/forgotpw", forgotPassword)
userRoute.post("/resetpw", resetPassword)
userRoute.get("/", getAllUsers)

userRoute.use(auth)

userRoute.get("/dashboard", userDashboard) 
module.exports = userRoute