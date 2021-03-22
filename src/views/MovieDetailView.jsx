import { Component, Suspense, lazy } from 'react'
import { NavLink, Route, Switch } from 'react-router-dom'
import MoviesApi from '../servises/moviesAPI'
import routes from '../routes'

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
        console.log(movieId);
        this.setState({ ...await MoviesApi.getMovieDetails(movieId) }
        )
    }

    handleGoBack = () => {
        const { location, history } = this.props
        console.log(location.state.state, 'test');
        history.push(location?.state?.state?.fromState || location?.state?.fromState || routes.movies)
        console.log(history, '2');
    }

    render() {
        const { poster_path, genres, popularity, title, tagline, overview } = this.state
        const { match, location } = this.props
        const { BASE_IMG_URL, DEFAULT_IMG } = MoviesApi
        const imageCheck = poster_path ? BASE_IMG_URL + poster_path : DEFAULT_IMG
        return <>
            <div className='movie-detail__container'>
                <button type='button' className='backBtn' onClick={this.handleGoBack}>Назад</button>
                <div className='img-wrapper'><img src={imageCheck} alt={title} /><span className='tagline'>{tagline}</span></div>
                <div className='detail-wrapper'>
                    <h1>{title}</h1>
                    <span className='genres'>
                        {genres?.map(genre => {
                            return genre.name
                        })}
                    </span>
                    <span className='popularity'>{popularity}</span>
                    <p className='overview'>{overview}</p>
                </div>
                <ul className='review-list'>
                    <li><NavLink to={{
                        pathname: `${match.url}${routes.reviews}`,
                        state: location
                    }}>Reviews </NavLink>
                    </li>
                    <li><NavLink to={`${match.url}${routes.cast}`}>Credits</NavLink></li>
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

export default MovieDetailView
