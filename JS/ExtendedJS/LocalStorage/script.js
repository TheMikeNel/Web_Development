const formEl = document.querySelector('#film-form');
const nameInput = document.querySelector('#name-input');
const genreInput = document.querySelector('#genre-input');
const yearInput = document.querySelector('#year-input');
const watchedInput = document.querySelector('#watched-input');
const submitBtn = document.querySelector('.film-submit');
const selectEl = document.querySelector("#year-filter");
const sortBtn = document.querySelector('#sort-btn');
const tableBody = document.querySelector('table tbody');

let filmsArr = JSON.parse(localStorage.getItem('filmsArr')) || [];
let currentYearFilter = '';
let isSort = false;
let editingId = null;

function saveToStorage() {
    localStorage.setItem('filmsArr', JSON.stringify(filmsArr));
}

function renderTable() {
    tableBody.innerHTML = '';

    let currentFilms = [...filmsArr]; 
    if (currentYearFilter) {
        currentFilms = currentFilms.filter(film => film.year === currentYearFilter);
    }

    if (isSort) {
        currentFilms.sort((a, b) => +a.year - +b.year);
    }

    currentFilms.forEach(film => {
        const newRow = document.createElement('tr');
        newRow.className = 'film-table-row';

        newRow.innerHTML = `
            <td>${film.name}</td>
            <td>${film.genre}</td>
            <td>${film.year}</td>
            <td>${film.isWatched}</td>
            <td>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;

        newRow.querySelector('.delete-btn').addEventListener('click', () => {
            deleteFilm(film.id);
        });

        newRow.querySelector('.edit-btn').addEventListener('click', () => {
            startEdit(film);
        });

        tableBody.appendChild(newRow);
    });
}

function updateYearFilter() {
    selectEl.innerHTML = '<option value="">- select a year -</option>';
    
    const uniqueYears = [...new Set(filmsArr.map(f => f.year))].sort((a, b) => b - a);

    uniqueYears.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        if (year === currentYearFilter) option.selected = true;
        selectEl.appendChild(option);
    });
}

function deleteFilm(id) {
    filmsArr = filmsArr.filter(film => film.id !== id);
    
    if (editingId === id) resetForm(); 
    
    saveToStorage();
    updateYearFilter();
    renderTable();
}

function startEdit(film) {
    editingId = film.id;
    nameInput.value = film.name;
    genreInput.value = film.genre;
    yearInput.value = film.year;
    watchedInput.checked = film.isWatched === 'Yes';
    
    submitBtn.textContent = "Update Film";
}

function resetForm() {
    editingId = null;
    formEl.reset();
    submitBtn.textContent = "Add Film";
}

[nameInput, genreInput, yearInput].forEach(input => {
    input.addEventListener('input', () => input.setCustomValidity(''));
});

formEl.addEventListener('submit', function (event) {
    event.preventDefault();
    
    const name = nameInput.value.trim();
    const genre = genreInput.value.trim();
    const year = yearInput.value.trim();

    if (!name || !genre || !year) {
        if (!name) nameInput.setCustomValidity("Value cannot be empty!");
        if (!genre) genreInput.setCustomValidity("Value cannot be empty!");
        if (!year) yearInput.setCustomValidity("Value cannot be empty!");
        formEl.reportValidity();
        return;
    }

    const filmData = {
        name,
        genre,
        year,
        isWatched: watchedInput.checked ? 'Yes' : 'No'
    };

    if (editingId !== null) {
        const index = filmsArr.findIndex(f => f.id === editingId);
        if (index !== -1) {
            filmsArr[index] = { ...filmsArr[index], ...filmData };
        }
    } else {
        filmData.id = +new Date();
        filmsArr.push(filmData);
    }

    resetForm();
    saveToStorage();
    updateYearFilter();
    renderTable();
});

sortBtn.addEventListener('click', () => {
    isSort = !isSort;
    sortBtn.textContent = isSort ? "Clear Sort" : "Sort by Year";
    renderTable();
});

selectEl.addEventListener('change', (e) => {
    currentYearFilter = e.target.value;
    renderTable();
});

renderTable();
updateYearFilter();