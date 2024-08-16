const validator = require("validator")
const userModel = require("../../models/user.model")
const transactionModel = require("../../models/transaction.model")


const addIncome = async (req, res) => {

    const {amount, remarks} = req.body

    if(!amount) throw "Please enter amount"
    if(!remarks) throw "Please enter remarks"
    if(!validator.isNumeric(amount.toString())) throw "You can only enter Numbers in amount"
    if(amount < 0) throw "Please enter positive values only."


    const income = await transactionModel.create({
        user_id : req.user._id,
        amount,
        remarks,
        transaction_type : "income"
    })

    await userModel.updateOne({
        _id : req.user._id
    },{ 
        $inc: { balance: amount } 
    }, {
        runValidators : true
    })
    res.status(200).json({
        status : "success",
        message : "Income added successfully"
    })
}

module.exports = addIncome