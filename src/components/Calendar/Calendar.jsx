import React, { useState, useEffect } from 'react'
import '../Calendar/calendar.css'
// import matches from '../../assets/matches.js'

const Calendar = () => {
	const [matches, setMatches] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					'https://raw.githubusercontent.com/tfdf63/tg-app-fc-matches/main/matches.json'
				)
				if (!response.ok) {
					throw new Error('Network response was not ok')
				}
				const data = await response.json()
				setMatches(data)
				console.log(data)
				setLoading(false)
			} catch (error) {
				console.error('Error fetching the matches:', error)
				setError(error)
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	if (loading) return <div>Loading...</div>
	if (error) return <div>Error: {error.message}</div>

	return (
		<div className='calendar'>
			{matches.map(match => (
				<div key={match.id} className='calendar__box'>
					<div className='calendar__subitem'>
						<div className='calendar__liga'>{match.liga}</div>
						<div className='calendar__tour'>1 тур</div>{' '}
						{/* Можете добавить туры в массив позже */}
						<div className='calendar__date'>{match.date}</div>
						<div className='calendar__spectators'>{match.spectators} fans</div>
					</div>
					<div className='calendar__item'>
						<div className='calendar__team_h'>{match.team_h}</div>
						<div className='calendar__delimiter'>
							{match.score_h}:{match.score_g}
						</div>
						<div className='calendar__team_g'>{match.team_g}</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default Calendar
