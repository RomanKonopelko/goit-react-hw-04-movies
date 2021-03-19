import axios from 'axios';

const API_KEY = '1714653b36d931e81c8218b5a0f3a967';

class MovieAPI {
  constructor(key) {
    this.KEY = key;
    this.BASE_URL = 'https://api.themoviedb.org/3/';
  }

  async getTrending() {
    const response = await axios.get(`${this.BASE_URL}trending/movie/day?api_key=${this.KEY}`);
    const data = response.data;
    const movies = data.results;
    return movies;
  }

  async searchMovies(query, page) {
    const response = await axios.get(
      `${this.BASE_URL}search/movie?api_key=${this.KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`,
    );
    const data = response.data;
    const movies = data.results;
    return movies;
  }

  async getMovieDetails() {
    const response = await axios.get(`${this.BASE_URL}movie/500?api_key=${this.KEY}&language=en-US`);
    const data = response.data;
    return data;
  }

  async getMovieReviews() {
    const response = await axios.get(`${this.BASE_URL}movie/500/reviews?api_key=${this.KEY}&language=en-US`);
    const data = response.data;
    const results = data.results;
    return results;
  }

  async getMovieCredits() {
    const response = await axios.get(`${this.BASE_URL}movie/500/credits?api_key=${this.KEY}&language=en-US`);
    const data = response.data;
    return data;
  }
}

const MoviesApi = new MovieAPI(API_KEY);

export default MoviesApi;
