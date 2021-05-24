require('dotenv').config()

const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const userRoute = require('./routes/user.route')
const cookieParser = require('cookie-parser')
const authRoute = require('./routes/auth.route')
const authMiddleware = require('./middlewares/auth.middleware')
const productRoute = require('./routes/product.route')
app.set('view engine', 'pug')
app.set('views', './views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(express.static('public'))
app.use(cookieParser('fuckthiswhynot59'))

// Routes
app.get('/', (req, res) => {
  res.render('index')
})


app.use('/users', authMiddleware.requireAuth, userRoute)
app.use('/auth/', authRoute)
app.use('/products', productRoute)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})