import routes from '../routes'
import { NavLink, withRouter } from 'react-router-dom'

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

export default withRouter(MovieList)