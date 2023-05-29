
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Sequelize = require('sequelize')
const app = express()

app.use(express.json())
app.use(cors())


// make requests to database



const {userLogin, userSignup } = require('./controller/auth-controller.js')
const {userAddMovie, userAddTv, userAddBook, userAddGame, getMovies, completeMovie, deleteMovie, getTv, completeTv, deleteTv, getBooks, completeBook, deleteBook, getGames, completeGame, deleteGame } = require('./controller/controller.js')


//auth endpoints
app.post('/api/login', userLogin)
app.post('/api/signUp', userSignup)

//add activities to database from form
app.post('/api/movie', userAddMovie)
app.post('/api/tv', userAddTv)
app.post('/api/book', userAddBook)
app.post('/api/game', userAddGame)

//to-do page
app.get('/api/getMovies/:userId', getMovies)
app.put('/api/completeMovie/:movieId', completeMovie)
app.delete('/api/deleteMovie/:movieId', deleteMovie)
app.get('/api/getTv/:userId', getTv)
app.put('/api/completeTv/:tvId', completeTv)
app.delete('/api/deleteTv/:tvId', deleteTv)
app.get('/api/getBooks/:userId', getBooks)
app.put('/api/completeBook/:bookId', completeBook)
app.delete('/api/deleteBook/:bookId', deleteBook)
app.get('/api/getGames/:userId', getGames)
app.put('/api/completeGame/:gameId', completeGame)
app.delete('/api/deleteGame/:gameId', deleteGame)


app.listen(process.env.SERVER_PORT, () => console.log('Server running on port 5500'))