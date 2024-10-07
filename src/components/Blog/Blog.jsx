import './blog.css'
// import '../../assets/blogdata.js'
// import blogdata from '../../assets/blogdata.js'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Blog = () => {
	const [blogs, setBlogs] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					'https://raw.githubusercontent.com/tfdf63/tg-app-fc-matches/main/blogdata.json'
				)
				if (!response.ok) {
					throw new Error('Network response was not ok')
				}
				const data = await response.json()
				setBlogs(data)
				console.log(data)
				setLoading(false)
			} catch (error) {
				console.error('Error fetching the blogs:', error)
				setError(error)
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	if (loading) return <div>Loading...</div>
	if (error) return <div>Error: {error.message}</div>

	const truncateDescription = (text, limit) => {
		if (text.length > limit) {
			return text.slice(0, limit) + '...'
		}
		return text
	}
	return (
		<div className='blog'>
			{blogs
				.slice()
				.reverse()
				.map(item => (
					<div key={item.id}>
						<Link to={`/blog/${item.id}`} className='blog__item'>
							<div className='blog__title'> {item.title}</div>
							<div className='blog__wrapper'>
								<div className='blog__author'>{item.author} </div>
								<div className='blog__date'>{item.date}</div>
							</div>
							<div
								className='blog__description'
								style={{ whiteSpace: 'pre-line' }}
							>
								{truncateDescription(item.description, 160)}
							</div>
						</Link>
					</div>
				))}
		</div>
	)
}

export default Blog
