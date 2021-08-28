// настройка приложения
const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars');
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const coursesRoutes = require('./routes/courses')
const cardRoutes = require('./routes/card')

const app = express()

const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs"
})


//регистрируем движок hbs (handlebars)
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
// ('views', 'views' - папка в которой будет все шаблоны)
app.set('views', 'views')


app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/card', cardRoutes)


// app.get('/', (req, res) => {
//     res.status(200)
//     res.sendFile(path.join(__dirname, 'views', 'index.hbs'))
// })


// app.get('/about', (req, res) => {
//     res.status(200)
//     res.sendFile(path.join(__dirname, 'views', 'courses.hbs'))
// })


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})