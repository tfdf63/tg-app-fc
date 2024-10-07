import '../Header/header.css'
import { Link } from 'react-router-dom'
import { FaHome, FaTable, FaVk, FaTelegramPlane } from 'react-icons/fa'
import { GrArticle } from 'react-icons/gr'

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
					<GrArticle className='header__blog' />
				</Link>
				<Link to={'https://vk.com/fcakron_fans'}>
					<FaVk className='header__tg' />
				</Link>
				<Link to={'https://t.me/slava_tfdf'}>
					<FaTelegramPlane className='header__tg' />
				</Link>
			</div>
		</div>
	)
}

export default Header
