

const baseURL = `http://localhost:5500`;

//submit buttons
const movieSubmit = document.getElementById('movieSubmit')
const tvSubmit = document.getElementById('tvSubmit')
const bookSubmit = document.getElementById('bookSubmit')
const gameSubmit = document.getElementById('gameSubmit')

// inputs from form.html
// movies
const movieTitle = document.getElementById('movie-title')
const movieYear = document.getElementById('movie-year')
const moviePlat = document.getElementById('movie-plat')

// tv
const tvTitle = document.getElementById('tv-title')
const tvSeasons = document.getElementById('tv-seasons')
const tvEp = document.getElementById('tv-episodes')
const tvMins = document.getElementById('tv-minutes')
const tvPlat = document.getElementById('tv-plat')

//books
const bookTitle = document.getElementById('book-title')
const bookAuthor = document.getElementById('book-author')
const bookPages = document.getElementById('book-pages')

//games
const gameTitle = document.getElementById('game-title')
const gamePlat = document.getElementById('game-plat')


//takes info from front end form.html- makes request to controller.js
//add new movie 
const addMovie = (e) => {
    const userId = sessionStorage.getItem("userId")
    e.preventDefault()
    let body = { title: movieTitle.value, year: movieYear.value, platform: moviePlat.value, userId  }
    axios.post(`${baseURL}/api/movie`, body)
      .then((res) => {
        console.log(res.data);
        window.location.href = `./to-do.html`;
      })
      .catch((err) => console.log(err));
    }

// add new tv show
const addTv = (e) => {
    const userId = sessionStorage.getItem("userId")
    e.preventDefault()
    let body = { title: tvTitle.value, seasons: tvSeasons.value, episodes: tvEp.value, minutes: tvMins.value, platform: tvPlat.value, userId  }
    axios.post(`${baseURL}/api/tv`, body)
      .then((res) => {
        console.log(res.data);
        window.location.href = `./to-do.html`;
      })
      .catch((err) => console.log(err));
    }

const addBook = (e) => {
    const userId = sessionStorage.getItem("userId")
    e.preventDefault()
    let body = { title: bookTitle.value, author: bookAuthor.value, pages: bookPages.value, userId  }
    axios.post(`${baseURL}/api/book`, body)
      .then((res) => {
        console.log(res.data);
        window.location.href = `./to-do.html`;
      })
      .catch((err) => console.log(err));
    }

const addGame = (e) => {
    const userId = sessionStorage.getItem("userId")
    e.preventDefault()
    let body = { title: gameTitle.value, platform: gamePlat.value, userId  }
    axios.post(`${baseURL}/api/game`, body)
      .then((res) => {
        console.log(res.data);
        window.location.href = `./to-do.html`;
      })
      .catch((err) => console.log(err));
    }


// event listeners - when there is a click run a function on this page that makes a request to the database
movieSubmit.addEventListener('click', addMovie)
tvSubmit.addEventListener('click', addTv)
bookSubmit.addEventListener('click', addBook)
gameSubmit.addEventListener('click', addGame)




