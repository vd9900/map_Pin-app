const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")

const userRoute = require("./routers/users")
const pinRoute = require('./routers/pins')

const app = express()

//middlewares
app.use(express.json())

//Routes
app.use("/api/users",userRoute)
app.use("/api/pins",pinRoute)



dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
    .then(() => console.log("Database connected"))
    .catch((e) => console.log(e))





app.listen(4444, () => {
    console.log("Backend server started");
})