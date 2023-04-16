const express = require("express")
const cors = require('cors')
require("dotenv").config({ path: "./config/.env" })
const mongoose = require("mongoose")
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL)
const app = express()
app.use(cors())
app.use(express.json())
app.use("/todo", require("./routes/todoRoutes"))
app.use("*", (req, res) => {
    res.json({
        message: "404 : Resource Not Found "
    })
})

mongoose.connection.once("open", () => {
    console.log("DB MONGO CONNECTED");
    app.listen(process.env.PORT, (err) => {
        if (err) {
            console.log(`UNABLE TO START SERVER ${err}`)
        } else {
            console.log(`SERVER RUNNNING http://localhost:${process.env.PORT}`);
        }
    })
})

mongoose.connection.on("error", (err) => {
    console.log(`Mongo Conncetion Errror ${err}`);
})