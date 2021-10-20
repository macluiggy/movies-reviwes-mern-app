import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Login = () => {
	const[name, setName] = useState('');
	const [id, setId] = useState('')

	const onChangeName = e => {
		const name = e.target.value
		setName(name)
	}

	const onChangeId = e => {
		const id = e.target.value;
		setId(id)
	}
}

export default Login;