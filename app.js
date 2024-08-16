require('express-async-errors')
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const { errorHandler } = require("./handlers/errorHandler")
const userRoute = require('./routes/user.route')
const transactionRoute = require('./routes/transaction.route')
require("dotenv").config()
const app = express()
app.use(cors())

app.use(express.json())

mongoose.connect(process.env.MONGO_URL, {}).then(() => {
    console.log("MongoDB connected successfully")
    app.listen(process.env.PORT, () =>{
        console.log(`Server is listening on ${process.env.PORT}`)
    })
}).catch(() => {
    console.log("Error in mongoDB connection")
})

require("./models/user.model")
require("./models/transaction.model")

app.use("/api/user", userRoute)
app.use("/api/transaction", transactionRoute)

app.all("*", (req, res) => {
    res.status(404).json({
        status : "failed",
        message : "Not Found"
    })
})


app.use(errorHandler)




