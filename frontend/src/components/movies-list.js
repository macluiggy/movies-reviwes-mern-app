import { useState, useEffect } from 'react'
import MovieDataService from '../services/movies'
import { link } from 'react-router-dom'

/*function MovieList() {
	return (
		<div className='App'>
			Movie List
		</div>
	);
}*/

const MovieList = props => {
	const [movies, setMovies] = useState([])
	const [searchTitle, setSearchTitle] = useState('')
	const [searchRating, setSearchRating] = useState('')
	const [ratings, setRatings] = useState(['All Ratings'])

	useEffect(() => {
		retrieveMovies()
		retrieveRatings()
	}, [])

	const retrieveMovies = () => {
		MovieDataService.getAll()
			.then(response => {
				console.log(response)
				setMovies(response.data.movies);
			})
			.catch(e => {
				console.log(e)
			})
	}

	const retrieveRatings = () => {
		MovieDataService.getRatings()
			.then(response => {
				console.log(response.data)
				setRatings(['All Ratings']).concat(response.data)
			})
			.catch(e => {
				console.log(e)
			})
	}
}

export default MovieList;