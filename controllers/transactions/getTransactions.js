const transactionModel = require("../../models/transaction.model")

const getTransactions = async (req, res) => {
    const transactions = await transactionModel.find({
        user_id : req.user._id,
        ...req.query
    })

    res.status(200).json({
        status : "success",
        message : "All transaction for loaded successfully.",
        transactions
    })
}

module.exports = getTransactions