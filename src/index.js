import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
import card from './part/countries-card.hbs';
import cardList from './part/list-card.hbs';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const infoEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  if (!event.target.value.trim()) {
    clear();
    return;
  }
  if (event.value === 0) {
    Notify.failure('not found', { timeout: 400 });
  }
  fetchCountries(event.target.value.trim())
    .then(countries => {
      clear();
      if (countries.length > 10) {
        Notify.failure(
          'Too many matches found. Please enter a more specific name.',
          { timeout: 400 }
        );
        return;
      }
      if (countries.length <= 10 && countries.length >= 2) {
        listEl.innerHTML = countries.map(cardList).join('');
        return;
      }

      infoEl.innerHTML = card(countries[0]);
      return;
    })
    .catch(error => {
      clear();
      Notify.failure(error, {
        timeout: 400,
      });
    });
}

function clear() {
  listEl.innerHTML = '';
  infoEl.innerHTML = '';
}