import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Login = props => {
	const[name, setName] = useState('');
	const [id, setId] = useState('')
	console.log(props.history.push)
	const onChangeName = e => {
		const name = e.target.value//actualiza el nombre
		setName(name)
	}

	const onChangeId = e => {
		const id = e.target.value;
		setId(id)//actualiza el id
	}

	const login = () => {
		//cuando se haga click en submit
		props.login({ name: name, id: id })//establece el usuario proveniente de props
		props.history.push('/')//actualiza el path para que se redireccione a la pagina pricipal
	}

	return (
		<div>
			<Form>
				<Form.Group>
					<Form.Label>Username</Form.Label>
					<Form.Control
				       type='text'
				       placeholder='Enter username'
				       value={name}
				       onChange={onChangeName}		
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>ID</Form.Label>
					<Form.Control 
					   type='text'
					   placeholder='Enter id'
					   value={id}
					   onChange={onChangeId}
					/>
				</Form.Group>
				<Button variant='primary' onClick={login}>
					Submit
				</Button>
			</Form>
		</div>
	)
}

export default Login;