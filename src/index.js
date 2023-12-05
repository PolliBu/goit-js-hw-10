import { fetchBreeds, fetchCatByBreed } from "./cat-api";

import "./styles.css";
import SlimSelect from "slim-select";
import "slim-select/dist/slimselect.css";
import Notiflix from "notiflix";

const breedSelect = document.querySelector(".breed-select");
const catInfo = document.querySelector(".cat-info");
const loaderCat = document.querySelector(".loader");
// const error = document.querySelector(".error");

showLoader();

fetchBreeds()
  .then(data => selectCat(data))
  .catch(error=> {
    Notiflix.Report.failure(
      'Error',
      'Oops! Something went wrong! Try reloading the page!',
      'OK'
    );
  })
  .finally(() => showLoader(false));

breedSelect.addEventListener('change', event => {
  markup(event.target.value);
});

function selectCat(data) {
  breedSelect.innerHTML = makeOptionMarkup(data);

  showSelect();

  new SlimSelect({
    select: '.breed-select'
  });
}


function createMarkup(url, name, description, temperament) {
  return `<img class = "cat_img" src="${url}" alt="${name}" width = "300" />
      <div class = "all_description">
      <h2>${name}</h2>
      <p>${description}</p>
      <p><b>Temperament:</b> ${temperament}</p>
      </div>`;
}

function makeOptionMarkup(data) {
  return data
    .map(item => `<option value="${item.id}">${item.name}</option>`)
    .join('');
}

function markup(breedId) {
  catInfo.innerHTML = '';
  showLoader();
  fetchCatByBreed(breedId)
    .then(({ breeds: [cat], url }) => {
      catInfo.innerHTML = createMarkup(
        url,
        cat.name,
        cat.description,
        cat.temperament
      );
    })
    .catch(error => {
      Notiflix.Report.failure(
        'Error',
        'Oops! Something went wrong! Try reloading the page!',
        'OK'
      );
    })
    .finally(() => showLoader(false));
}

function showLoader(isShow = true) {
  loaderCat.style.display = isShow ? 'block' : 'none';
  catInfo.style.display = 'flex';
  // error.style.display = 'none';
}

function showSelect(isShow = true) {
  breedSelect.style.display = isShow ? 'inline-block' : 'none';
}