import { Component } from 'react'
import MoviesApi from '../servises/moviesAPI'

class Cast extends Component {
    state = {
        cast: [],
    }

    async componentDidMount() {
        const { movieId } = this.props.match.params
        console.log(this.props);
        this.setState({
            cast: await MoviesApi.getMovieCredits(movieId).then(data => data.cast)
        })
    }
    render() {
        const { cast } = this.state
        const { BASE_IMG_URL, DEFAULT_IMG } = MoviesApi
        return (<ul className='cast-list'>
            { cast && cast.map(({ name, character, profile_path, cast_id }) => {
                return <li className='cast-member' key={cast_id}>
                    <h2 className='cast-name'>{name}</h2>
                    <h3 className='character-name'>{character}</h3>
                    <img src={profile_path ? BASE_IMG_URL + profile_path : DEFAULT_IMG} width='300' alt={name} />
                </li>
            })}
        </ul>)
    }
}

export default Cast