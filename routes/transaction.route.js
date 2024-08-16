const express = require("express")

const { auth } = require("../middleware/auth")
const addIncome = require("../controllers/transactions/addIncome")
const addExpense = require("../controllers/transactions/addExpense")
const getTransactions = require("../controllers/transactions/getTransactions")
const deleteTransaction = require("../controllers/transactions/deleteTransaction")
const editTransaction = require("../controllers/transactions/editTransaction")
const transactionRoute = express.Router()

transactionRoute.use(auth)

transactionRoute.post("/addIncome", addIncome)
transactionRoute.post("/addExpense", addExpense)
transactionRoute.get("/", getTransactions)
transactionRoute.delete("/:transaction_id", deleteTransaction)
transactionRoute.patch("/", editTransaction)

module.exports = transactionRoute