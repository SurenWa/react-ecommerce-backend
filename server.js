const express = require('express');
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require("fs")
require('dotenv').config()



//app
const app = express()

//db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(() => console.log('DB CONNECTED SUCCESSFULLY'))
.catch(err => console.log('DB CONNECTION ERROR', err))

//middlewares
app.use(morgan("dev"))
//app.use(express.json())
app.use(bodyParser({limit: '50mb'}));
app.use(cors())

//routes middleware 
//app.use('/api', authRoutes)
//import routes
//const authRoutes = require('./routes/auth')
fs.readdirSync('./routes').map((r) => 
    app.use('/api',require("./routes/" + r))
)

//PORT
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

