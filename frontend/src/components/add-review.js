import React, { useState } from 'react'
import MovieDataService from "../services/movies"
import { Link } from "react-router-dom"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AddReview = props => {
	let editing = false//si esta en falso quiere decir que estamos añadiendo
	let initialReviewState = ''//el estado inicial de la review
							   //cuando editamos la review, se va a actualizar
							   //console.log(props, 'holaaaa')
 	if (props.location.state && props.location.state.currentReview) {
 		editing = true;
 		initialReviewState = props.location.state.currentReview.review
 	}
	const [review, setReview] = useState(initialReviewState)
	//este se guarda cuando se envia la review para establecer que ya se envió
	const [submitted, setSubmitted] = useState(false)

	//se actauliza la review cuando tipeamos
	const onChangeReview = e => {
		const review = e.target.value
		setReview(review)
	}
	//console.log(props.match, 'heeeeeeeeeelooo')
	const saveReview = () => {
		if (!review) { return alert('Please enter a review') }
		var data = {
			review: review,
			name: props.user.name,
			user_id: props.user.id,
			movie_id: props.match.params.id,
		}

		if (editing) {
			//obten el id de la review ya existente
			data.review_id = props.location.state.currentReview._id
			MovieDataService.updateReview(data)
				.then(response => {
					setSubmitted(true)
					console.log(response.data)
				})
				.catch(e => {
					console.log(e)
				})
		}
		else {
			MovieDataService.createReview(data)
				.then(response => {
					setSubmitted(true)
					console.log(response.data)
				})
				.catch(e => {
					console.log(e)
				})
		}
	}
	

	return (
		<div>
			{ submitted ? (
				<div>
					<h4>Review submitted successfully</h4>
					<Link to={`/movies/${props.match.params.id}`}>Back to Movie</Link>
				</div>
			):(
				<Form>
					<Form.Group>
						<Form.Label>{editing ? 'Edit' : 'Create'} Review</Form.Label>
						<Form.Control  
						 type='text'
						 required
						 value={review}
						 onChange={onChangeReview}
						/>
					</Form.Group>
					<Button variant='primary' onClick={saveReview} >
						Submit
					</Button>
				</Form>
			)}
		</div>
	)
}

export default AddReview;