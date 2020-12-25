const addMovieModal = document.querySelector('#add-modal');
const startAddMovieButton = document.querySelector('header button');
const backdrop = document.querySelector('#backdrop');
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const addMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
const entryTextValue = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');

const movies = [];

const updateUI = () => {
  if (movies.length === 0) {
    entryTextValue.style.display = 'block';
  } else {
    entryTextValue.style.display = 'none';
  }
};

const deleteMovie = (movieId) => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movieId === movie.id) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  const listRoot = document.getElementById('movie-list');
  listRoot.children[movieIndex].remove();
  // listRoot.removeChild(listRoot.children[movieIndex]);
  cancelMovieDeletion();
  updateUI();
};

const deleteMovieHandler = (movieId) => {
  deleteMovieModal.classList.add('visible');
  toggleBackdrop();
  const cancelBtn = deleteMovieModal.querySelector('.btn--passive');
  let confirmBtn = deleteMovieModal.querySelector('.btn--danger');

  confirmBtn.replaceWith(confirmBtn.cloneNode(true));

  confirmBtn = deleteMovieModal.querySelector('.btn--danger');

  cancelBtn.removeEventListener('click', cancelMovieDeletion);
  cancelBtn.addEventListener('click', cancelMovieDeletion);
  confirmBtn.addEventListener('click', deleteMovie.bind(null, movieId));
  // deleteMovie(movieId);
};

const renderNewMovie = (id, title, imageUrl, rating) => {
  const newLi = document.createElement('li');
  newLi.className = 'movie-element';
  newLi.innerHTML = `
       <div class="movie-element__image">
          <img src="${imageUrl}" alt = "${title}"/>
       </div>
       <div class="movie-element__info">
          <h2> ${title}</h2>
          <p>${rating}/5 stars</p>
       </div>
  `;

  newLi.addEventListener('click', deleteMovieHandler.bind(null, id));

  const listRoot = document.getElementById('movie-list');
  listRoot.append(newLi);
};

const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
};

const clearMovieInput = () => {
  for (const i of userInputs) {
    i.value = '';
  }
};

const cancelMovieDeletion = () => {
  deleteMovieModal.classList.remove('visible');
  toggleBackdrop();
};

const closeMovieModal = () => {
  addMovieModal.classList.remove('visible');
};

const showMovieModal = () => {
  addMovieModal.classList.add('visible');
  toggleBackdrop();
};

const backdropClickHandler = () => {
  closeMovieModal();
  cancelMovieDeletion();
  clearMovieInput();
};

const cancelAddMovieHandler = () => {
  closeMovieModal();
  clearMovieInput();
  toggleBackdrop();
};

const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (
    titleValue.trim() == '' ||
    imageUrlValue.trim() == '' ||
    ratingValue.trim() == '' ||
    ratingValue < 1 ||
    ratingValue > 5
  ) {
    alert('Please enter valid input...');
    return;
  }

  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue,
  };
  movies.push(newMovie);
  console.log(movies);
  closeMovieModal();
  toggleBackdrop();
  updateUI();
  renderNewMovie(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
  clearMovieInput();
};

startAddMovieButton.addEventListener('click', showMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
addMovieButton.addEventListener('click', addMovieHandler);
