import './table.css'
import '../../assets/tableRPL.js'
import { useEffect, useState } from 'react'

const Table = () => {
	const [tablerpl, setTablerpl] = useState([])
	const [tablecup, setTablecup] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					'https://raw.githubusercontent.com/tfdf63/tg-app-fc-matches/main/tablerpl.json'
				)
				if (!response.ok) {
					throw new Error('Network response was not ok')
				}
				const data = await response.json()
				setTablerpl(data)
				console.log(data)
				setLoading(false)
			} catch (error) {
				console.error('Error fetching the tablerpl:', error)
				setError(error)
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					'https://raw.githubusercontent.com/tfdf63/tg-app-fc-matches/main/tablecup.json'
				)
				if (!response.ok) {
					throw new Error('Network response was not ok')
				}
				const data = await response.json()
				setTablecup(data)
				console.log(data)
				setLoading(false)
			} catch (error) {
				console.error('Error fetching the tablecup:', error)
				setError(error)
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	if (loading) return <div>Loading...</div>
	if (error) return <div>Error: {error.message}</div>

	return (
		<div className='table'>
			<div className='table__box'>
				<h2>МИР Российская Премьер-Лига</h2>
				<div className='table__item'>
					<div className='table__place'>#</div>
					<div className='table__team'>Команда</div>
					<div className='table__win'>В</div>
					<div className='table__draw'>Н</div>
					<div className='table__lose'>П</div>
					<div className='table__points'>О</div>
				</div>
				<div></div>
				{tablerpl.map(item => (
					<div
						key={item.id}
						className={
							item.team === 'Акрон' ? 'table__item_akron' : 'table__item'
						}
					>
						<div className='table__place'>{item.id}</div>
						<div className='table__team'>{item.team}</div>
						<div className='table__win'>{item.win}</div>
						<div className='table__draw'>{item.draw}</div>
						<div className='table__lose'>{item.lose}</div>
						<div className='table__points'>{item.points}</div>
					</div>
				))}
			</div>
			<div className='table__box_cup'>
				<h2>Fonbet Кубок России по футболу</h2>
				<div className='table__item_cup'>
					<div className='table__place_cup'>#</div>
					<div className='table__team_cup'>Команда</div>
					<div className='table__win_cup'>В</div>
					<div className='table__win_cup'>ВП</div>
					<div className='table__draw_cup'>П</div>
					<div className='table__draw_cup'>ПП</div>
					<div className='table__points_cup'>О</div>
				</div>
				<div></div>
				{tablecup.map(item => (
					<div
						key={item.id}
						className={
							item.team === 'Акрон' ? 'table__item_akroncup' : 'table__item_cup'
						}
					>
						<div className='table__place_cup'>{item.id}</div>
						<div className='table__team_cup'>{item.team}</div>
						<div className='table__win_cup'>{item.win}</div>
						<div className='table__win_cup'>{item.winw}</div>
						<div className='table__draw_cup'>{item.draw}</div>
						<div className='table__draw_cup'>{item.drawd}</div>
						<div className='table__points_cup'>{item.points}</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Table
