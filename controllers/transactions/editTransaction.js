const transactionModel = require("../../models/transaction.model")
const validator = require("validator")

const editTransaction = async (req, res) => {

    const { transaction_id, remarks } = req.body

    if(!transaction_id) throw "Transaction_id is Required."

    if(!validator.isMongoId(transaction_id.toString())) throw "Please provide a valid id!!"

    const transaction = await transactionModel.findOne({
        _id : transaction_id
    })

    if(!transaction) throw "Transaction not found"

    await transactionModel.updateOne({
        _id : transaction_id
    },{
        remarks,
    },{
        runValidators : true
    })

    res.status(200).json({
        status : "success",
        message : "Transaction updated successfully"
    })

}

module.exports = editTransaction