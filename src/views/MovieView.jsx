import { Component } from 'react'
import { Link } from 'react-router-dom'
import MoviesApi from '../servises/moviesAPI'


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
        const { match } = this.props
        return <ul className='movie-list'>
            {movies.map(movie => {
                return <li key={movie.id}>
                    <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
                </li>
            })}
        </ul>
    }
}
export default MovieView