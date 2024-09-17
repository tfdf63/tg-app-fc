import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const Form = () => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		birthDate: '',
		phone: '',
		email: '',
		fanId: '',
		consent: false,
		status: 'pending',
	})

	const handleChange = e => {
		const { name, value, type, checked } = e.target
		setFormData(prevData => ({
			...prevData,
			[name]: type === 'checkbox' ? checked : value,
		}))
	}

	const handleSubmit = e => {
		e.preventDefault()

		const newEntry = {
			id: uuidv4(), // Генерация уникального ID
			...formData,
		}

		// Сохранение данных в JSON файл
		const data = JSON.stringify(newEntry, null, 2)
		downloadJson(data)
	}

	const downloadJson = data => {
		const blob = new Blob([data], { type: 'application/json' })
		const link = document.createElement('a')
		link.href = URL.createObjectURL(blob)
		link.download = 'data.json'
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label>First Name:</label>
				<input
					type='text'
					name='firstName'
					value={formData.firstName}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<label>Last Name:</label>
				<input
					type='text'
					name='lastName'
					value={formData.lastName}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<label>Birth Date:</label>
				<input
					type='date'
					name='birthDate'
					value={formData.birthDate}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<label>Phone:</label>
				<input
					type='tel'
					name='phone'
					value={formData.phone}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<label>Email:</label>
				<input
					type='email'
					name='email'
					value={formData.email}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<label>Fan ID (9 digits):</label>
				<input
					type='text'
					name='fanId'
					value={formData.fanId}
					onChange={handleChange}
					pattern='\d{9}'
					required
				/>
			</div>
			<div>
				<label>
					<input
						type='checkbox'
						name='consent'
						checked={formData.consent}
						onChange={handleChange}
						required
					/>
					Consent to Data Processing
				</label>
			</div>
			<button type='submit'>Submit</button>
		</form>
	)
}

export default Form
