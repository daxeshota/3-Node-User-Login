const transactionModel = require("../../models/transaction.model")
const userModel = require("../../models/user.model")
const validator = require("validator")

const deleteTransaction = async (req, res) => {
    const { transaction_id } = req.params

    if(!validator.isMongoId(transaction_id.toString())) throw "Invalid ID!!"
    
    const transaction = await transactionModel.findOne({
        _id : transaction_id
    })
    
    if(!transaction) throw "This transaction does not exists."

    if(transaction.transaction_type === "income"){
        await userModel.updateOne({
            _id : transaction.user_id
        },{
            $inc : {
                balance : (transaction.amount * -1)
            }
        },{
            runValidators : true
        })
    }
    else{
        await userModel.updateOne({
            _id : transaction.user_id
        },{
            $inc : {
                balance : transaction.amount
            }
        },{
            runValidators : true
        })
    }


    await transactionModel.deleteOne({
        _id : transaction_id
    })
    res.status(200).json({
        status : "success",
        message : "Transaction deleted successfully."
    })

}

module.exports = deleteTransaction