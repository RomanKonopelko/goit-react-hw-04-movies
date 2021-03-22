import routes from '../routes'
import PropTypes from 'prop-types'
import { NavLink, withRouter } from 'react-router-dom'
import '../app.css'

function MovieList({ movies, src, defaultImg, location }) {
    return (<ul className='movie-list'>
        {movies.map(({ id, poster_path, title }) => {
            return <li key={id}>
                <NavLink className='movie-card' to={{
                    pathname: `${routes.movies}/${id}`,
                    state: {
                        fromState: location
                    }
                }}>
                    <img className='movie-card-img' src={poster_path ? src + poster_path : defaultImg} alt={title} />
                </NavLink>
            </li>
        })}
    </ul >)
}

MovieList.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        poster_path: PropTypes.string,
        title: PropTypes.string.isRequired
    })).isRequired,
    src: PropTypes.string.isRequired,
    defaultImg: PropTypes.string.isRequired,
    location: PropTypes.shape({}).isRequired,
}

export default withRouter(MovieList)