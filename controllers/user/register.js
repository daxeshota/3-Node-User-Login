const emailManager = require("../../manager/emailManager")
const jwtManager = require("../../manager/jwtManager")
const userModel = require("../../models/user.model")
const bcrypt = require("bcrypt")

const register = async (req, res) => {

    const {name, email, password, confirm_password, balance} = req.body

    if(!name) throw "Name is required"
    if(!email) throw "Email is required"
    if(!password) throw "Password is required"
    if(password.length < 5) throw "Password must be 5 characters long."
    if(password != confirm_password) throw "Password and Confirm password both are different."

    const getDuplicateEmail = await userModel.findOne({ email : email})
    if(getDuplicateEmail) throw "This Email already exists."

    const hashPassword = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        name : name,
        email : email,
        password : hashPassword,
        balance : balance,
    })

    const accessToken = jwtManager(user)

    await emailManager(user.email, "Welcome to Expense Tracker", "Welcome to Expense Tracker Project.", `Hey ${user.name}, Welcome to Expense Tracker.`)

    res.status(201).json({
        status : "success",
        message : "User registered successfully",
        accessToken : accessToken
    })
}

module.exports = { register } 