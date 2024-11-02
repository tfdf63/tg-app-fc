import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Calendar from './components/Calendar/Calendar'
import Table from './components/Table/Table'
import Header from './components/Header/Header'
import Blog from './components/Blog/Blog'
import SingleBlog from './components/SingleBlog/SingleBlog'
import Register from './components/Register/Register'
import Shop from './components/Shop/Shop'

function App() {
	return (
		<BrowserRouter>
			<div className='App'>
				<Header />
				<Routes>
					<Route path='/' element={<Calendar />} />
					<Route path='/register' element={<Register />} />
					<Route path='/table' element={<Table />} />
					<Route path='/blog' element={<Blog />} />
					<Route path='/blog/:id' element={<SingleBlog />} />
					<Route path='/shop' element={<Shop />} />
				</Routes>
			</div>
		</BrowserRouter>
	)
}

export default App
