const fetchCountries = name => {
  return fetch(`https://restcountries.com/v3.1/name/${name}?fields=population,capital,name,languages,flags`).then(response => {
    if (!response.ok) {
      throw 'Oops, there is no country with that name';
    }
    return response.json();
  });
};
export { fetchCountries };