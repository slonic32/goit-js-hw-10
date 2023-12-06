import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import Notiflix from 'notiflix';

const selectBreed = document.querySelector('select.breed-select');
const catInfo = document.querySelector('div.cat-info');
const pLoader = document.querySelector('p.loader');
const pError = document.querySelector('p.error');

pLoader.style.display = 'none';
selectBreed.style.display = 'none';
pError.style.display = 'none';
selectBreed.style.marginBottom = '20px';

selectBreed.addEventListener('input', onBreedChange);

Notiflix.Loading.standard('Loading data, please wait...');
fetchBreeds()
  .then(breedId => fillBreedSelect(breedId))
  .catch(error => catError(error));

function fillBreedSelect(breedId) {
  const options = [];
  breedId.forEach(element => {
    const option = document.createElement('option');
    option.value = element.id;
    option.textContent = element.name;
    options.push(option);
  });
  selectBreed.append(...options);
  selectBreed.selectedIndex = -1;
  selectBreed.style.display = '';
  Notiflix.Loading.remove();
}

function onBreedChange() {
  const i = selectBreed.selectedIndex;
  const id = selectBreed.options[i].value;
  catInfo.style.display = 'none';
  Notiflix.Loading.standard('Loading data, please wait...');
  fetchCatByBreed(id)
    .then(breedData => showBreedInfo(breedData))
    .catch(error => catError(error));
}

function showBreedInfo(breedData) {
  const imgInfo = breedData[0];
  const breedInfo = breedData[0].breeds[0];
  const breedDescription = `
  <img src="${imgInfo.url}" alt="${breedInfo.name}" width="320px" style="margin-right:20px"/>
  <div>
  <h1 style="margin-top:0">${breedInfo.name}</h1>
  <p>${breedInfo.description}</p>
  <p><span style="font-weight: bold">Temperament: </span>${breedInfo.temperament}</p>
  </div>`;
  catInfo.innerHTML = breedDescription;
  catInfo.style.display = 'flex';
  Notiflix.Loading.remove();
}

function catError(error) {
  Notiflix.Loading.remove();
  Notiflix.Notify.failure(error);
}
