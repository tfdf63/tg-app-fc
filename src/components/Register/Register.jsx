import React, { useState } from 'react'
import axios from 'axios'
import './Register.css'
import { useNavigate } from 'react-router-dom'

const CreateUser = () => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		dateOfBirth: '',
		email: '',
		password: '',
	})

	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')

	//Редирект
	const navigate = useNavigate()

	const handleChange = e => {
		const { name, value } = e.target
		setFormData({
			...formData,
			[name]: value,
		})
	}

	const handleSubmit = async e => {
		e.preventDefault()
		setError('')
		setSuccess('')

		try {
			// Удалите переменную response, если не используете ее
			await axios.post('/api/users', formData)
			setSuccess('Вы успешно зарегистрировались!')
			setFormData({
				firstName: '',
				lastName: '',
				dateOfBirth: '',
				email: '',
				password: '',
			})

			// Редирект через 5 секунд после успешного создания пользователя
			setTimeout(() => {
				navigate('/') // Редирект на главную страницу
			}, 3000) // 3000 миллисекунд = 3 секунд
		} catch (error) {
			setError('Error creating user: ' + error.response.data.error)
		}
	}

	return (
		<div className='register'>
			<div className='register__box'>
				<h2>Регистрация</h2>
				<form onSubmit={handleSubmit} className='register__item'>
					<input
						type='text'
						name='firstName'
						value={formData.firstName}
						onChange={handleChange}
						placeholder='Имя'
						required
					/>
					<input
						type='text'
						name='lastName'
						value={formData.lastName}
						onChange={handleChange}
						placeholder='Фамилия'
						required
					/>
					<input
						type='date'
						name='dateOfBirth'
						value={formData.dateOfBirth}
						onChange={handleChange}
						required
					/>
					<input
						type='email'
						name='email'
						value={formData.email}
						onChange={handleChange}
						placeholder='Email'
						required
					/>
					<input
						type='password'
						name='password'
						value={formData.password}
						onChange={handleChange}
						placeholder='Пароль'
						required
					/>
					<button type='submit'>Зарегистрироваться!</button>
				</form>
				{error && <p style={{ color: 'red' }}>{error}</p>}
				{success && <p style={{ color: 'green' }}>{success}</p>}
			</div>
		</div>
	)
}

export default CreateUser
