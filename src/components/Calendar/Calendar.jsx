import '../Calendar/calendar.css'
import matches from '../../assets/matches.js'

const Calendar = () => {
	return (
		<div className='calendar'>
			{matches.map(match => (
				<div key={match.id} className='calendar__box'>
					<div className='calendar__item'>
						<div className='calendar__team_h'>{match.team_h}</div>
						<div className='calendar__delimiter'>
							{match.score_h}:{match.score_g}
						</div>
						<div className='calendar__team_g'>{match.team_g}</div>
					</div>
					<div className='calendar__subitem'>
						<div className='calendar__liga'>{match.liga}</div>
						<div className='calendar__tour'>1 тур</div>{' '}
						{/* Можете добавить туры в массив позже */}
						<div className='calendar__date'>{match.date}</div>
						<div className='calendar__spectators'>{match.spectators} fans</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default Calendar
