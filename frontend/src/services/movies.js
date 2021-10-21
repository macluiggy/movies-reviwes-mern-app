import axios from 'axios';

let apiUrl = `https://movies-reviews-backend.herokuapp.com/api/v1/movies`

class MovieDataService {

	getAll(page = 0) {
		return axios.get(`${apiUrl}?page=${page}`)
	}

	get(id) {
		return axios.get(`${apiUrl}/id/${id}`)
	}

	find(query, by = 'title', page = 0) {
		return axios.get(
			`${apiUrl}?${by}=${query}&page=${page}`
		)
	}

	createReview(data) {
		return axios.post(`${apiUrl}/review`, data)
	}

	updateReview(data) {
		return axios.put(`${apiUrl}/review`, data)
	}

	deleteReview(id, userId) {
			return axios.delete(
				`${apiUrl}/review`,
				{ data: { review_id: id, user_id: userId } }
			)
		}

	getRatings() {
		return axios.get(`${apiUrl}/ratings`)
	}
	
}

export default new MovieDataService;