const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const userRoute = require('./routes/user.route')

app.set('view engine', 'pug')
app.set('views', './views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(express.static('public'))


// Routes
app.get('/', (req, res) => {
  res.render('index')
})


app.use('/users', userRoute)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})