require('dotenv').config
const {CONNECTION_STRING} = process.env
const Sequelize = require('sequelize')

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  });


module.exports = {
//form page
    userAddMovie: (req, res) => {
        const { title, year, userId, platform } = req.body;
        sequelize
        .query(`INSERT INTO movies(movie_title, year, user_id, platform, has_finished) 
                VALUES('${title}', ${year}, ${userId}, '${platform}', false)
                `)
        .then(() => {
            res.status(200).send('movie added')
        })
        .catch((err) => console.log(err));
    },

    userAddTv: (req, res) => {
        const { title, seasons, episodes, minutes, platform, userId } = req.body;
        sequelize
        .query(`INSERT INTO tv_shows(tv_title, number_of_seasons, total_episodes, average_episode_length_mins, user_id, has_finished, platform ) 
                VALUES('${title}', ${seasons}, ${episodes}, ${minutes}, ${userId}, false, '${platform}')
                `)
        .then(() => {
            res.status(200).send('tv show added')
        })
        .catch((err) => console.log(err));
    },

    userAddBook: (req, res) => {
      const { title, author, userId, pages } = req.body;
      sequelize
      .query(`INSERT INTO books(book_title, author, total_pages,  user_id) 
              VALUES('${title}', '${author}',  ${pages}, ${userId})
              `)
      .then(() => {
          res.status(200).send('book added')
      })
      .catch((err) => console.log(err));
    },

    userAddGame: (req, res) => {
      const { title, platform, userId } = req.body;
      sequelize
      .query(`INSERT INTO games(game_title, platform, user_id) 
              VALUES('${title}', '${platform}', ${userId})
              `)
      .then(() => {
          res.status(200).send('game added')
      })
      .catch((err) => console.log(err));
    },
//list of movies
    getMovies: (req, res) => {
      const {userId} = req.params
      sequelize.query(`SELECT * FROM movies WHERE user_id = ${userId}`)
        .then(dbRes => {
          res.status(200).send(dbRes[0]) 
          //console.log(dbRes[0])
        })
      .catch((err) => console.log(err));
    },
    
    completeMovie: (req, res) => {
      const {movieId} = req.params
      console.log(movieId)
      sequelize.query(`update movies set has_finished = true where movie_id = ${movieId}`)
      .then(() => {
        console.log('movie updated')
        res.status(200).send('movie updated')
      })
      .catch((err) => console.log(err));  
    }, 

    deleteMovie: (req, res) => {
      const {movieId} = req.params
      console.log(movieId)
      sequelize.query(`delete from movies where movie_id = ${movieId}`)
      .then(() => {
        console.log('movie deleted')
        res.status(200).send('movie deleted')
      })
      .catch((err) => console.log(err));  
    }, 
//list of tv shows
    getTv: (req, res) => {
      const {userId} = req.params
      sequelize.query(`SELECT * FROM tv_shows WHERE user_id = ${userId}`)
        .then(dbRes => {
          res.status(200).send(dbRes[0]) 
        })
      .catch((err) => console.log(err));
    },
    
    completeTv: (req, res) => {
      const {tvId} = req.params
      //console.log(tvId)
      sequelize.query(`update tv_shows set has_finished = true where tv_id = ${tvId}`)
      .then(() => {
        console.log('tv show updated')
        res.status(200).send('tv show updated')
      })
      .catch((err) => console.log(err));  
    }, 

    deleteTv: (req, res) => {
      const {tvId} = req.params
      //console.log(tvId)
      sequelize.query(`delete from tv_shows where tv_id = ${tvId}`)
      .then(() => {
        console.log('tv show deleted')
        res.status(200).send('tv show deleted')
      })
      .catch((err) => console.log(err));  
    },
//list of books
getBooks: (req, res) => {
  const {userId} = req.params
  sequelize.query(`SELECT * FROM books WHERE user_id = ${userId}`)
    .then(dbRes => {
      console.log(dbRes[0])
      res.status(200).send(dbRes[0]) 
    })
  .catch((err) => console.log(err));
},

completeBook: (req, res) => {
  const {bookId} = req.params
  sequelize.query(`update books set has_finished = true where book_id = ${bookId}`)
  .then(() => {
    console.log('book updated')
    res.status(200).send('book updated')
  })
  .catch((err) => console.log(err));  
}, 
deleteBook: (req, res) => {
  const {bookId} = req.params
  sequelize.query(`delete from books where book_id = ${bookId}`)
  .then(() => {
    console.log('book deleted')
    res.status(200).send('book deleted')
  })
  .catch((err) => console.log(err));  
},
//list of games
getGames: (req, res) => {
  const {userId} = req.params
  sequelize.query(`SELECT * FROM games WHERE user_id = ${userId}`)
    .then(dbRes => {
      res.status(200).send(dbRes[0]) 
    })
  .catch((err) => console.log(err));
},

completeGame: (req, res) => {
  const {gameId} = req.params
  sequelize.query(`update games set has_finished = true where game_id = ${gameId}`)
  .then(() => {
    console.log('game updated')
    res.status(200).send('game updated')
  })
  .catch((err) => console.log(err));  
}, 
deleteGame: (req, res) => {
  const {bookId} = req.params
  sequelize.query(`delete from games where game_id = ${gameId}`)
  .then(() => {
    console.log('game deleted')
    res.status(200).send('game deleted')
  })
  .catch((err) => console.log(err));  
},
    

   

}