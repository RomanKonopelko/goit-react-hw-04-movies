import { Component } from "react"
import MoviesApi from '../servises/moviesAPI'
import MovieList from '../Components/MovieList'
import PropTypes from 'prop-types'
import '../app.css'

class MovieSearchView extends Component {
    state = {
        query: '',
        movies: [],
    }

    componentDidMount() {
        const { location } = this.props
        const SearchParams = new URLSearchParams(location.search)
        const query = SearchParams.get('query')
        if (query) {
            return MoviesApi.searchMovies(query, 1).then(data => {
                this.setState({
                    movies: data
                })
            })
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location.search !== this.props.location.search) {

            const { location } = this.props
            const SearchParams = new URLSearchParams(location.search)
            const query = SearchParams.get('query')

            if (query !== null) {
                MoviesApi.searchMovies(query, 1).then(data => {
                    this.setState({
                        movies: data
                    })
                })
            } else {
                this.setState({
                    movies: []
                })
            }
        }
    }

    handleOnChange = (e) => {
        const queryValue = e.currentTarget.value
        this.setState({
            query: queryValue
        })
    }

    handleMovieSearch = (e) => {
        const { location, history } = this.props
        e.preventDefault();
        MoviesApi.searchMovies(this.state.query, 1).then(data => {
            this.setState({
                movies: data
            })
        })
        history.push({ ...location, 'search': `?query=${this.state.query}` })
    }
    render() {
        const { query, movies } = this.state
        const { BASE_IMG_URL, DEFAULT_IMG } = MoviesApi
        return <div>
            <form className='search-form'>
                <input type="text" value={query} onChange={this.handleOnChange} />
                <button type='submit' onClick={this.handleMovieSearch}>Search</button>
            </form>
            <MovieList movies={movies} src={BASE_IMG_URL} defaultImg={DEFAULT_IMG} />
        </div>
    }
}

MovieSearchView.propTypes = {
    location: PropTypes.shape({
        search: PropTypes.string.isRequired,
    }).isRequired,
    history: PropTypes.shape({
        location: PropTypes.object.isRequired,
    }).isRequired,
}
export default MovieSearchView