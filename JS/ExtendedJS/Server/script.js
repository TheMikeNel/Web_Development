const API_URL = "https://sb-film.skillbox.cc/films";
const API_HEADERS = {
  "Content-Type": "application/json",
  email: "myemail@gmail.com",
};

const formEl = document.querySelector('#film-form');

const titleInEl = document.querySelector('#title');
const genreInEl = document.querySelector('#genre');
const yearInEl = document.querySelector('#release-year');
const watchedEl = document.querySelector('#is-watched');

const filterInEl = document.querySelector('#filter-value');
const filterFieldEl = document.querySelector('#filter-field');
const deleteAllBtn = document.querySelector('#delete-all-btn');

const filmTableEl = document.querySelector('#film-tbody');

function getFormValues() {
  return {
    title: titleInEl.value.trim(),
    genre: genreInEl.value.trim(),
    releaseYear: yearInEl.value.trim(),
    isWatched: watchedEl.checked,
  };
}

function validateFilm(film) {
  if (!film.title) {
    titleInEl.setCustomValidity("Введите название фильма.");
    return false;
  }
  if (!film.genre) {
    genreInEl.setCustomValidity("Введите жанр фильма.");
    return false;
  }
  if (!film.releaseYear) {
    yearInEl.setCustomValidity("Введите год выпуска.");  
    return false;
  }
  return true;
}

function getFilterQuery() {
  const filterValue = filterInEl.value.trim();
  if (!filterValue) return "";

  const filterField = filterFieldEl.value;
  if (filterField === "isWatched") {
    const normalizedValue = filterValue.toLowerCase();

    if (
      normalizedValue === "да" ||
      normalizedValue === "true" ||
      normalizedValue === "1"
    ) {
      return "?isWatched=true";
    }

    if (
      normalizedValue === "нет" ||
      normalizedValue === "false" ||
      normalizedValue === "0"
    ) {
      return "?isWatched=false";
    }

    return "";
  }

  return "?" + filterField + "=" + encodeURIComponent(filterValue);
}

async function addFilm(film) {
  await fetch(API_URL, {
    method: "POST",
    headers: API_HEADERS,
    body: JSON.stringify(film),
  });
}

async function getFilms() {
  const filmsResponse = await fetch(API_URL + getFilterQuery(), {
    headers: API_HEADERS,
  });

  return filmsResponse.json();
}

async function deleteFilm(id) {
  await fetch(API_URL + "/" + id, {
    method: "DELETE",
    headers: API_HEADERS,
  });

  await renderTable();
}

async function deleteAllFilms() {
  await fetch(API_URL, {
    method: "DELETE",
    headers: API_HEADERS,
  });

  await renderTable();
}

async function renderTable() {
  const films = await getFilms();

  filmTableEl.innerHTML = "";

  films.forEach((film) => {
    const row = document.createElement("tr");
    const deleteButton = document.createElement("button");
    const actionCell = document.createElement("td");
    const filmId = film.id;

    deleteButton.className = "delete-button"
    deleteButton.textContent = "Удалить";
    deleteButton.addEventListener("click", function () {
      deleteFilm(filmId);
    });

    row.innerHTML =
      "<td>" +
      film.title +
      "</td>" +
      "<td>" +
      film.genre +
      "</td>" +
      "<td>" +
      film.releaseYear +
      "</td>" +
      "<td>" +
      (film.isWatched ? "Да" : "Нет") +
      "</td>";

    actionCell.appendChild(deleteButton);
    row.appendChild(actionCell);
    filmTableEl.appendChild(row);
  });
}

async function submitForm(event) {
  event.preventDefault();

  const film = getFormValues();

  if (!validateFilm(film)) {
    formEl.reportValidity();
    return;
  }

  await addFilm(film);
  formEl.reset();
  await renderTable();
}

titleInEl.addEventListener('input', function () {
  titleInEl.setCustomValidity("");
});
genreInEl.addEventListener('input', function () {
  genreInEl.setCustomValidity("");
});
yearInEl.addEventListener('input', function () {
  yearInEl.setCustomValidity("");
});

formEl.addEventListener("submit", submitForm);
filterInEl.addEventListener("input", renderTable);
filterInEl.addEventListener("blur", renderTable);
filterFieldEl.addEventListener("change", renderTable);
deleteAllBtn.addEventListener('click', deleteAllFilms);

renderTable();
