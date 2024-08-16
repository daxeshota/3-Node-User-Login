const userModel = require("../../models/user.model")
const bcrypt = require("bcrypt")
const validator  = require("validator")
const emailManager = require("../../manager/emailManager")

const resetPassword = async (req, res) => {
    const {email, resetCode, newPassword} = req.body

    if(!email) throw "Email is required."
    if(!resetCode) throw "resetCode is required."
    if(!validator.isNumeric(resetCode.toString())) throw "Only numbers are allowed in resetCode."
    if(!newPassword) throw "newPassword is required."
    if(newPassword.length < 5) throw "Password must be 5 characters long."

    const user = await userModel.findOne({
        email : email,
        resetCode : resetCode
    })

    if(!user) throw "User does not exists."
    if(resetCode !== user.resetCode) throw "Something wrong in resetCode, please verify your resetCode."

    const updatedPassword = await bcrypt.hash(newPassword, 10)

    const updatedUser = await userModel.updateOne({
        email : email
    },{
        password : updatedPassword,
        resetCode : ""
    },{
        runValidators : true
    })

    await emailManager(email, "Password Reset Successfully", "Your Password just reset, it its not you please cntact us.",  "Your Password just reset, it its not you please cntact us." )

    res.status(200).json({
        status : "success",
        message : "Password updated successfully"
    })
}

module.exports = resetPassword