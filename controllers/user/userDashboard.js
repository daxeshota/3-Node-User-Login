const userModel = require("../../models/user.model")
const transactionModel = require("../../models/transaction.model")

const userDashboard = async (req, res) => {

    const getUser = await userModel.findOne({
        _id : req.user._id
    }).select("-password")

    const transactions = await transactionModel.find({
        user_id : req.user._id
    }).sort("-createdAt").limit(5)

    res.status(200).json({
        status : "success",
        message : "Dashboard loaded successfully",
        data : getUser,
        transactions
    })
}

module.exports = { userDashboard}