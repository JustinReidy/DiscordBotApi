const express = require("express")
const app = express()
require("dotenv").config()
const morgan = require("morgan")
const mongoose = require("mongoose")
const PORT = process.env.PORT || 8080
const path = require("path")

app.use(express.json())
app.use(morgan('dev'))
// app.use(express.static(path.join(__dirname, "client", "build")))

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/DiscordBotApi", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: false
},
() => console.log("Connected to DB"))

// Routes
app.use("/playerHands", require('./routes/handRouter'))

// Error Handling

app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === "UnauthorizedError"){
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client" , "build", "index.html"))
// })

app.listen(PORT, () => console.log(`Server Running on port: ${PORT}`))