import { Component } from 'react'
import { NavLink, Route, Switch } from 'react-router-dom'
import Reviews from '../Components/Revievs'
import Cast from '../Components/Cast'
import MoviesApi from '../servises/moviesAPI'

class MovieDetailView extends Component {
    state = {
        backdrop_path: null,
        genres: null,
        popularity: null,
        title: null,
        overview: null,
        tagline: null,
    }

    async componentDidMount() {
        const { movieId } = this.props.match.params
        this.setState({ ...await MoviesApi.getMovieDetails(movieId) }
        )
    }

    render() {
        const { backdrop_path, genres, popularity, title, tagline, overview } = this.state
        const { match } = this.props
        const { BASE_IMG_URL, DEFAULT_IMG } = MoviesApi
        const imageCheck = backdrop_path ? BASE_IMG_URL + backdrop_path : DEFAULT_IMG
        return <>
            <div className='movie-detail__container'>
                <h1>{title}</h1>
                <span className='genres'>
                    {genres?.map(genre => {
                        return genre.name
                    })}
                </span>
                <span className='popularity'>{popularity}</span>
                <div className='img-wrapper'><img src={imageCheck} alt={title} /><span className='tagline'>{tagline}</span></div>
                <p className='overview'>{overview}</p>
                <ul className='review-list'>
                    <li><NavLink to={`${match.url}/reviews`}>Reviews</NavLink></li>
                    <li><NavLink to={`${match.url}/cast`}>Credits</NavLink></li>
                </ul>
            </div>
            <Switch>
                <Route path={`${match.path}/reviews`} component={Reviews} />
                <Route path={`${match.path}/cast`} component={Cast} />
            </Switch>
        </>
    }
}

export default MovieDetailView
