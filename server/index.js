require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const massive = require('massive')
const session = require('express-session')

const ac = require('./controllers/auth')
const pc = require('./controllers/post')

const app = express()

const { CONNECTION_STRING, SERVER_PORT: PORT, SESSION_SECRET } = process.env

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('db connected')
})

app.use(bodyParser.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false
}))

app.post('/auth/login', ac.login)
app.post('/auth/register', ac.register)
app.get('/auth/logout', ac.logout)
app.get('/auth/currentUser', ac.getUser)

app.get('/api/posts')
app.post('/api/posts')
app.put('/api/posts/:id')
app.delete('/api/posts/:id')

app.listen(PORT, () => {
    console.log('Listening on port', PORT)
})