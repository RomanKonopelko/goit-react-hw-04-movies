import axios from 'axios';
import DEFAULT_IMG from '../media/default.jpg';
const API_KEY = '1714653b36d931e81c8218b5a0f3a967';

class MovieAPI {
  constructor(key) {
    this.KEY = key;
    this.DEFAULT_IMG = DEFAULT_IMG;
    this.BASE_IMG_URL = 'https://image.tmdb.org/t/p/w780/';
    this.BASE_URL = 'https://api.themoviedb.org/3/';
  }

  async getTrending() {
    const response = await axios.get(
      `${this.BASE_URL}trending/movie/day?api_key=${this.KEY}`,
    );
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

  async getMovieDetails(id) {
    const response = await axios.get(
      `${this.BASE_URL}movie/${id}?api_key=${this.KEY}&language=en-US`,
    );
    const data = response.data;
    return data;
  }

  async getMovieReviews(id) {
    const response = await axios.get(
      `${this.BASE_URL}movie/${id}/reviews?api_key=${this.KEY}&language=en-US`,
    );
    const data = response.data;
    const results = data.results;
    return results;
  }

  async getMovieCredits(id) {
    const response = await axios.get(
      `${this.BASE_URL}movie/${id}/credits?api_key=${this.KEY}&language=en-US`,
    );
    const data = response.data;
    return data;
  }
}

const MoviesApi = new MovieAPI(API_KEY);

export default MoviesApi;
