const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { validationResult, check} = require("express-validator") 
const expressValidator = require('express-validator')
require('dotenv').config()

//import routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const handymanRoutes = require('./routes/handyman')

//app
const app = express()

// db
mongoose.connect(process.env.DATABASE, {
}).then(() => console.log("DB Connected"))

// middlewares
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())
app.use(cors())

//routes middleware
app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', categoryRoutes)
app.use('/api', handymanRoutes)



const port = process.env.PORT || 8000


app.listen(port, () => {
    console.log(`Сервер работает на порту ${port}`)
})

