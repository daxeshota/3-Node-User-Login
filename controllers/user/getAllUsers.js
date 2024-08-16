const userModel = require("../../models/user.model")

const getAllUsers = async (req, res) => {
    const allUsers = await userModel.find({})

    if(allUsers.length == 0) throw "Not a single user exists in user table."

    res.status(200).json({
        status : "success",
        message : "User list loaded successfully",
        data : allUsers
    })
}

module.exports = { getAllUsers }