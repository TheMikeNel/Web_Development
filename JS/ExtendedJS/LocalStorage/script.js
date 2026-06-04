const formEl = document.querySelector('#film-form');
const nameInput = document.querySelector('#name-input');
const genreInput = document.querySelector('#genre-input');
const yearInput = document.querySelector('#year-input');
const watchedInput = document.querySelector('#watched-input');

const tableBody = document.querySelector('table tbody');

const filmData = {
    name: '',
    genre: '',
    year: '',
    isWatched: '',
    isValid: function() {
        return this.name && this.genre && this.year;
    }
}

function addNewFilm(film){
    const newRow = document.createElement('tr');
    newRow.className = 'film-table-row';

    for (const key in film){
        const cell = document.createElement('td');
        cell.textContent = film[key];
        newRow.appendChild(cell);
    }

    const editBtn = document.createElement('button');
    editBtn.textContent = "Edit"
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete"
    const actionCell = document.createElement('td');
    actionCell.appendChild(editBtn);
    actionCell.appendChild(deleteBtn);
    newRow.appendChild(actionCell);

    deleteBtn.addEventListener('click', function () {
        newRow.remove();
    });

    editBtn.addEventListener('click', function () {
        nameInput.value = filmName;
        genreInput.value = filmGenre;
        yearInput.value = filmYear;
        watchedInput.checked = isWatched === 'Yes';

        newRow.remove();
    });

    tableBody.appendChild(newRow);
}

formEl.addEventListener('submit', function (event) {
    event.preventDefault();
    const filmObj = Object.create(filmData);

    filmObj.name = nameInput.value.trim();
    if (filmObj.name.trim == '') {
        nameInput.setCustomValidity("Value cannot be empty!")
        formEl.reportVality();
    }
    else nameInput.setCustomValidity("Value cannot be empty!")

    filmObj.genre = genreInput.value.trim();
    filmObj.year = yearInput.value.trim();
    filmObj.isWatched = genreInput.checked ? 'Yes' : 'No';

    if (!filmObj.isValid) {
        alert('Please fill in all text fields.');
        return;
    }

    addNewFilm(filmObj)

    this.reset();    
});