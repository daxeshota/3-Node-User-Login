const emailManager = require('../../manager/emailManager')
const userModel = require('../../models/user.model')

const forgotPassword = async (req, res) => {
    const { email } = req.body

    if(!email) throw  "Email is required."

    const user = await userModel.findOne({
        email : email
    })

    if(!user) throw "This user does not exists."

    let resetCode = Math.floor(Math.random() * 10000)

    const updateUser = await userModel.updateOne({
        email : email
    },{
        resetCode : resetCode
    },{
        runvalidators : true
    })

    await emailManager(email, "Reset Password", `Hey ${user.name}, Please try this code ${resetCode} and update your password.`, `Hey ${user.name}, Please try this code ${resetCode} and update your password.`)


    res.status(200).json({
        status : "success",
        message : "Reset Code sent to you on your Email."
    })
}

module.exports =  { forgotPassword }