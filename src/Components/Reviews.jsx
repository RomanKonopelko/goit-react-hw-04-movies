import { Component } from 'react'
import { withRouter } from 'react-router-dom'
import MoviesApi from '../servises/moviesAPI'

class Reviews extends Component {
    state = {
        reviews: [],
    }

    async componentDidMount() {
        console.log(this.props);
        const { movieId } = this.props.match.params
        this.setState({
            reviews: await MoviesApi.getMovieReviews(movieId)
        })
    }
    render() {
        const { reviews } = this.state

        return <div>{reviews.length !== 0
            ? <ul className='reviews-list'>
                {reviews.map(({ author, content, id }) => {
                    return <li className='review-item' key={id}>
                        <h2 className='review-author'>{author}</h2>
                        <p className='review-content'>{content}</p>
                    </li>
                })}
            </ul>
            : <p> Sorry, we dont have any reviews yet</p>}
        </div>
    }
}

export default Reviews