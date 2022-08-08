import axios from 'axios';

const API_KEY = '28020117-3a98d2f0db4e6cde6fe7bd6ea';
const BASE_URL = 'https://pixabay.com';

export const fetchData = (query, page) => {
  return axios
    .get(
      `${BASE_URL}/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
    .then(response => response.data);
};
