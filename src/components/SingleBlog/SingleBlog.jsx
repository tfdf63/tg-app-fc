import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// import blogdatas from '../../assets/blogdata.js'

const SingleBlog = () => {
	const [blogs, setBlogs] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const params = useParams()
	const blogdata = blogs.find(item => item.id === Number(params.id))

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

	return (
		<div className='blog'>
			<div className='blog__item'>
				<div className='blog__title'> {blogdata.title}</div>
				<div className='blog__wrapper'>
					<div className='blog__author'>{blogdata.author} </div>
					<div className='blog__date'>{blogdata.date}</div>
				</div>
				<div className='blog__description' style={{ whiteSpace: 'pre-line' }}>
					{blogdata.description}
				</div>
			</div>
		</div>
	)
}

export default SingleBlog
