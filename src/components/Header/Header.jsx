import '../Header/header.css'
import { Link } from 'react-router-dom'
import { FaHome, FaTable, FaBlog } from 'react-icons/fa'

const Header = () => {
	return (
		<div className='header'>
			<div className='header__logo'>
				<Link to='/'>
					<FaHome className='header__home' />
				</Link>
				<Link to='/table'>
					<FaTable className='header__table' />
				</Link>
				<Link to='/blog'>
					<FaBlog className='header__blog' />
				</Link>
			</div>
		</div>
	)
}

export default Header
