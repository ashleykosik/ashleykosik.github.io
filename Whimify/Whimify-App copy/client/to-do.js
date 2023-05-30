//html elements
const welcome = document.getElementById('welcome')



// if logged in - display username
function loggedIn (userId) {
  if (sessionStorage.getItem("userId")) {
    // change h1 to add username
    let username = sessionStorage.getItem("username")
    welcome.innerHTML += username
  } else {
    window.location.href = `index.html`;
  }
}

//function section - starts at the bottom by making the request to load all items - chooses between completed or not
//movie functions
function toWatchMovie(data) {
  let movie_section = document.querySelector('.movies-list');
    let listItem = ''
      listItem += `<li><p class="title">${data.movie_title}</p>
                  <p class="year">(${data.year})</p>
                  <p class="platform">Watch On: ${data.platform}</p></li>
                  <button class="complete" id="movie-${data['movie_id']}" onclick="markMovieCompleted(${data.movie_id})">Watched</button>
                  <button class="delete" id="" onclick="markMovieDelete(${data.movie_id})">Delete</button>`
      movie_section.innerHTML += listItem

}

function addCompletedMovie(data) {
  let movie_section = document.querySelector('.movies-finished-list');
  let listItem = ''
    listItem += `<li><p class="title">${data.movie_title}</p>
                <p class="year">(${data.year})</p></li>`
  movie_section.innerHTML += listItem
}

function markMovieCompleted(id) {
  //removes buttons
  const selector = `#movie-${id}`
    const elemToRemove = document.querySelector(selector)
    elemToRemove.remove()
    //changes status in table
    axios.put(`/api/completeMovie/${id}`, {movieId: id})
        .then(() => location.reload())
        .catch(err => console.log(err))
}

function markMovieDelete(id) {
  axios.delete(`/api/deleteMovie/${id}`, {movieId: id})
      .then(() => location.reload())
      .catch(err => console.log(err))
}

function addMoviesView(data) {
    console.log(data)
    data.forEach((obj) => {
      if(obj.has_finished) {
        addCompletedMovie(obj)
      } else {
        toWatchMovie(obj)
      }
    })
}

const findAllMovies = () => {
    const userId = sessionStorage.getItem("userId")
    axios.get(`/api/getMovies/${userId}`)
        .then((res) => { 
           //console.log(res.data)
          addMoviesView(res.data)
        })
        .catch(err => console.log(err))
}
//end movie functions

//tv functions
function toWatchTv(data) {
  let tv_section = document.querySelector('.tv-list');
    let listItem = ''
      listItem += `<li><p class="title">${data.tv_title}</p>
                  <p class="seasons">(${data.number_of_seasons} - </p>
                  <p class="episodes">${data.total_episodes})</p>
                  <p class="platform">Watch On: ${data.platform}</p> 
                  <p class="minutes">(${data.average_episode_length_mins} minutes each)</p></li>
                  <button class="complete" id="tv-${data['tv_id']}" onclick="markTvCompleted(${data.tv_id})">Watched</button>
                  <button class="delete" id="" onclick="markTvDelete(${data.tv_id})">Delete</button>`
      tv_section.innerHTML += listItem
}

function addCompletedTv(data) {
  let tv_section = document.querySelector('.tv-finished-list');
  let listItem = ''
  let episodes = `${data.total_episodes}` 
  let minutes = `${data.average_episode_length_mins}`
  let hours = parseInt(episodes * minutes)
    listItem += `<li><p class="title">${data.tv_title}</p><br>
    <p class="seasons">${data.number_of_seasons} Seasons</p></li>`
  tv_section.innerHTML += listItem
}

function markTvCompleted(id) {
  const selector = `#tv-${id}`
    const elemToRemove = document.querySelector(selector)
    elemToRemove.remove()
    axios.put(`/api/completeTv/${id}`, {tvId: id})
        .then(() => location.reload())
        .catch(err => console.log(err))
}

function markTvDelete(id) {
  axios.delete(`/api/deleteTv/${id}`, {tvId: id})
      .then(() => location.reload())
      .catch(err => console.log(err))
}

function addTvView(data) {
    console.log(data)
    data.forEach((obj) => {
      if(obj.has_finished) {
        addCompletedTv(obj)
      } else {
        toWatchTv(obj)
      }
    })
}

const findAllTv = () => {
    const userId = sessionStorage.getItem("userId")
    axios.get(`/api/getTv/${userId}`)
        .then((res) => { 
          addTvView(res.data)
        })
        .catch(err => console.log(err))
}
//end tv functions

//book functions
function toReadBook(data) {
  let book_section = document.querySelector('.book-list');
    let listItem = ''
      listItem += `<li><p class="title">${data.book_title}</p>
                  <p class="author">By ${data.author}</p>
                  <p class="pages">(${data.total_pages} pages)</p></li>
                  <button class="complete" id="book-${data['book_id']}" onclick="markBookCompleted(${data.book_id})">Read</button>
                  <button class="delete" id="" onclick="markBookDelete(${data.book_id})">Delete</button>`
      book_section.innerHTML += listItem
}

function addCompletedBook(data) {
  let book_section = document.querySelector('.books-finished-list');
  let listItem = ''
    listItem += `<li><p class="title">${data.book_title}</p>
                  <p class="author">By ${data.author}</p></li>`
  book_section.innerHTML += listItem
}

function markBookCompleted(id) {
  const selector = `#book-${id}`
    const elemToRemove = document.querySelector(selector)
    elemToRemove.remove()
    axios.put(`/api/completeBook/${id}`, {bookId: id})
        .then(() => location.reload())
        .catch(err => console.log(err))
}

function markBookDelete(id) {
  axios.delete(`/api/deleteBook/${id}`, {bookId: id})
      .then(() => location.reload())
      .catch(err => console.log(err))
}

function addBookView(data) {
    //console.log(data)
    data.forEach((obj) => {
      if(obj.has_finished) {
        console.log(obj)
        addCompletedBook(obj)
      } else {
        toReadBook(obj)
      }
    })
}

const findAllBooks = () => {
    const userId = sessionStorage.getItem("userId")
    axios.get(`/api/getBooks/${userId}`)
        .then((res) => { 
          console.log(res.data)
          addBookView(res.data)
        })
        .catch(err => console.log(err))
}
//end book functions

//game functions
function toPlayGame(data) {
  let game_section = document.querySelector('.game-list');
    let listItem = ''
      listItem += `<li><p class="title">${data.game_title}</p>
                  <p class="platform">(${data.platform})</p></li>
                  <button class="complete" id="game-${data['game_id']}" onclick="markGameCompleted(${data.game_id})">Completed</button>
                  <button class="delete" id="" onclick="markGameDelete(${data.game_id})">Delete</button>`
      game_section.innerHTML += listItem
}

function addCompletedGame(data) {
  let game_section = document.querySelector('.game-finished-list');
  let listItem = ''
    listItem += `<li><p class="title">${data.game_title}</p>
                  <p class="platform">(${data.platform})</p></li>`
  game_section.innerHTML += listItem
}

function markGameCompleted(id) {
  const selector = `#game-${id}`
    const elemToRemove = document.querySelector(selector)
    elemToRemove.remove()
    axios.put(`/api/completeGame/${id}`, {gameId: id})
        .then(() => location.reload())
        .catch(err => console.log(err))
}

function markGameDelete(id) {
  axios.delete(`/api/deleteGame/${id}`, {gameId: id})
      .then(() => location.reload())
      .catch(err => console.log(err))
}

function addGameView(data) {
    console.log(data)
    data.forEach((obj) => {
      if(obj.has_finished) {
        addCompletedGame(obj)
      } else {
        toPlayGame(obj)
      }
    })
}

const findAllGames = () => {
    const userId = sessionStorage.getItem("userId")
    axios.get(`/api/getGames/${userId}`)
        .then((res) => { 
          addGameView(res.data)
        })
        .catch(err => console.log(err))
}
//end game functions

findAllMovies()
findAllTv()
findAllBooks()
findAllGames()
loggedIn(sessionStorage.getItem("userId"))

