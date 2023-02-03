require('dotenv').config();
const mongoose = require('mongoose')
const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const app = express()
const indexRouter = require('./routes/index') //controller or route
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)  //html
app.use(express.static('public')) //images
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
// app.use(bodyParser.json())
app.use(methodOverride('_method'))

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('connected to mongoose'))



app.use('/', indexRouter)    //initial go to controller/router and listen to it
app.use('/authors', authorRouter)
app.use('/books', bookRouter)

app.listen(process.env.PORT || 3000)