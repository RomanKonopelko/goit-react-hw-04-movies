import { Component, Suspense, lazy } from 'react'
import { NavLink, Route, Switch } from 'react-router-dom'
import MoviesApi from '../servises/moviesAPI'
import routes from '../routes'
import '../app.css'
import PropTypes from 'prop-types'

const Reviews = lazy(() => import('../Components/Reviews'));
const Cast = lazy(() => import('../Components/Cast'));

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

    handleGoBack = () => {
        const { location, history } = this.props
        history.push(location?.state?.state?.fromState || location?.state?.fromState || routes.movies)
    }

    render() {
        const { poster_path, genres, popularity, title, overview, id } = this.state
        const { match, location } = this.props
        const { BASE_IMG_URL, DEFAULT_IMG } = MoviesApi
        const imageCheck = poster_path ? BASE_IMG_URL + poster_path : DEFAULT_IMG
        return <>
            <div className='movie-detail__container'>
                <button type='button' className='backBtn' onClick={this.handleGoBack}>BACK</button>
                <div className='img-wrapper'><img src={imageCheck} alt={title} /></div>
                <div className='detail-wrapper'>
                    <h1>{title}</h1>
                    <ul className='genres-list'>
                        <b>Genres:</b>
                        {genres?.map(genre => {
                            return <li key={id + genre.name} className='genre-item'>{genre.name}</li>
                        })}
                    </ul>
                    <span className='popularity'><b>Popularity:</b> {popularity}</span>
                    <p className='overview'>{overview}</p>
                </div>
                <ul className='review-list'>
                    <li className='review-link'>
                        <NavLink to={{
                            pathname: `${match.url}${routes.reviews}`,
                            state: location
                        }}>
                            Reviews </NavLink>
                    </li>
                    <li className='review-link'><NavLink to={{
                        pathname: `${match.url}${routes.cast}`,
                        state: location
                    }}>Credits</NavLink></li>
                </ul>
            </div>
            <Suspense fallback={<h1>Loading</h1>}>
                <Switch>
                    <Route path={`${match.path}${routes.reviews}`} component={Reviews} />
                    <Route path={`${match.path}${routes.cast}`} component={Cast} />
                </Switch>
            </Suspense>
        </>
    }
}

MovieDetailView.propTypes = {
    match: PropTypes.shape({
        path: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
    }).isRequired,
    location: PropTypes.shape({}).isRequired,
    history: PropTypes.shape({
        location: PropTypes.object.isRequired,
    }).isRequired,
}

export default MovieDetailView
