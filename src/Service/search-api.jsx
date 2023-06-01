import PropTypes from 'prop-types';

const API_KEY = '35236008-ec0292df86782f7461c0757b8';
const BASE_URL = 'https://pixabay.com/api/';

export function fetchSearch(name, searchName, perPage, Page) {
  return fetch(
    `${BASE_URL}?key=${API_KEY}&q=${searchName}&image_type=photo&orientation=horizontal&per_page=${perPage}&page=${Page}`
  ).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Nothing found for your request ${name}`));
  });
}

fetchSearch.propTypes = {
  name: PropTypes.string.isRequired,
  searchName: PropTypes.func.isRequired,
  perPage: PropTypes.number.isRequired,
  Page: PropTypes.number.isRequired,
};
