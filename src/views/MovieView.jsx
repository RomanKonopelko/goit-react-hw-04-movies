import { Component } from 'react'
import MoviesApi from '../servises/moviesAPI'
import MovieList from '../Components/MovieList'


class MovieView extends Component {
    state = {
        movies: [],
    }

    async componentDidMount() {
        this.setState({
            movies: await MoviesApi.getTrending()
        })
    }

    render() {
        const { movies } = this.state
        const { BASE_IMG_URL, DEFAULT_IMG } = MoviesApi
        return <div className='home-container'>
            <h1>Today's popular</h1>
            <MovieList movies={movies} src={BASE_IMG_URL} defaultImg={DEFAULT_IMG} />
        </div>

    }
}
export default MovieView