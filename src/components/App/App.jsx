import './App.css'
import { Route, Routes } from 'react-router'
import Homepage from '../../pages/Homepage.jsx'
import Ranking from '../../pages/Ranking.jsx'
import Game from '../../pages/Game.jsx'
import Header from '../Header/Header.jsx'
import Footer from '../Footer/Footer.jsx'

function App() {
	return (
		<>
      <Header></Header>
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/game" element={<Game />} />
				<Route path="/ranking" element={<Ranking />} />
			</Routes>
      <Footer></Footer>
		</>
	)
}

export default App