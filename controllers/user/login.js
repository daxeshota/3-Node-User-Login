const jwtManager = require("../../manager/jwtManager")
const userModel = require("../../models/user.model")
const bcrypt = require("bcrypt")

const login = async (req, res) => {

    const { email, password} = req.body
    if(!email) throw "Email is required"
    if(!password) throw "Password is required"
    
    const user = await userModel.findOne({
        email : email
    })

    if(!user) throw "User not exists, Please verify your email."

    const passwordMatched = await bcrypt.compare(password, user.password)

    if(!passwordMatched) throw "Password did not matched."

   const accessToken = jwtManager(user)


    res.status(200).json({
        status : "success",
        message : "User Login successfully",
        accessToken : accessToken
    })
}

module.exports = { login } 