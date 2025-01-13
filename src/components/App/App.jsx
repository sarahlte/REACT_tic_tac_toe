import './App.css'
import { Link, Route, Routes } from 'react-router'
import Homepage from '../../pages/Homepage.jsx'
import Ranking from '../../pages/Ranking.jsx'
import Game from '../../pages/Game.jsx'
import logo from "../../assets/tic_tac_toe.png"


function App() {

	return (
		<>
			<header>
        <div className="navbar">
          <div >
            <div className="dropdown">
              {/* Menu dropdown */}
              <div tabIndex={0} className="lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/game">Game</Link>
                </li>
                <li>
                  <Link to="/ranking">Ranking</Link>
                </li>
              </ul>
            </div>
            {/* LOGO de la page tic tac toe */}
            <img src={logo} alt="" className='logo'/>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <button className='darkgrey-btn'><Link to="/"> Home</Link></button>
              </li>
              <li>
                <button className='darkgrey-btn'><Link to="/game">Game</Link></button>
              </li>
              <li>
                <button className='darkgrey-btn'><Link to="/ranking">Ranking</Link></button>
              </li>
            </ul>
          </div>
          <div>
            <button><Link to="/">Button</Link></button>
          </div>
        </div>
			</header>

			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/game" element={<Game />} />
				<Route path="/ranking" element={<Ranking />} />
			</Routes>
		</>
	)
}

export default App