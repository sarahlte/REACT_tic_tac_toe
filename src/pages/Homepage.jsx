import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUsers, faRobot, faPlay } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router'
import easy from '../assets/easy.png'
import hard from '../assets/hard.png'
import { useEffect, useState } from "react"

export default function Homepage() {
    const[game, setGame] = useState({mode: localStorage.getItem('mode') ? localStorage.getItem('mode') : null, difficulty: localStorage.getItem('difficulty')? localStorage.getItem('difficulty') : null})

    useEffect(() => {
        const mode = localStorage.getItem('mode');
        const difficulty = localStorage.getItem('difficulty');

        mode && difficulty ? setGame({mode: mode, difficulty: difficulty}) : setGame({mode: null, difficulty: null})
    }, []);

    useEffect(() => {
        localStorage.setItem('mode', game.mode);
    }, [game])

    useEffect(() => {
        localStorage.setItem('difficulty', game.difficulty);
    }, [game.difficulty])

    return (
        <div className="flex flex-col items-center">
            <h1>Choose your game mode</h1>            
            <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                <li className="pb-3 sm:pb-4">
                    <div className="flex items-center justify-start space-x-4 rtl:space-x-reverse">
                        <FontAwesomeIcon icon={faRobot} className="mr-2 h2-icon" />
                        <h2>Bot mode</h2>
                    </div>
                </li>
                <li className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="flex-shrink-0">
                            <img className="w-8 h-8" src={easy} alt="easy icon"/>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold truncate">
                                Original mode
                            </p>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                Classic tic tac toe
                            </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                            <button className="yellow-btn">
                                <Link to="/game" onClick={() => {
                                    setGame({mode: 'bot', difficulty:'easy'});
                                    localStorage.removeItem('board');
                                    localStorage.removeItem('player1');
                                    localStorage.removeItem('player2');
                                    localStorage.removeItem('ties');
                                    localStorage.removeItem('victory1');
                                    localStorage.removeItem('victory2');
                                }}>
                                    <FontAwesomeIcon icon={faPlay} className="mr-2" />
                                    Play
                                </Link>
                            </button>
                        </div>
                    </div>
                </li>
                <li className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="flex-shrink-0">
                            <img className="w-8 h-8" src={hard} alt="hard icon"/>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold truncate">
                                Hard mode
                            </p>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                3-hit tic tac toe
                            </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                            <button className="yellow-btn">
                                <Link to="/game" onClick={() => {
                                    setGame({mode: 'bot', difficulty:'hard'});
                                    localStorage.removeItem('board');
                                    localStorage.removeItem('player1');
                                    localStorage.removeItem('player2');
                                    localStorage.removeItem('ties');
                                    localStorage.removeItem('victory1');
                                    localStorage.removeItem('victory2');
                                }}>
                                    <FontAwesomeIcon icon={faPlay} className="mr-2" />
                                    Play
                                </Link>
                            </button>                    
                        </div>
                    </div>
                </li>
            </ul>
            <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700 mt-4">
                <li className="py-3 sm:py-4">
                    <div className="flex items-center justify-start space-x-4 rtl:space-x-reverse">
                        <FontAwesomeIcon icon={faUsers} className="mr-2 h2-icon" />
                        <h2>Multiplayer mode</h2>
                    </div>
                </li>
                <li className="pt-3 pb-0 sm:pt-4">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="flex-shrink-0">
                            <img className="w-8 h-8" src={easy} alt="easy icon"/>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold truncate">
                                Original mode
                            </p>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                Classic tic tac toe
                            </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                            <button className="yellow-btn">
                                <Link to="/game" onClick={() => {
                                    setGame({mode: 'multiplayer', difficulty:'easy'});
                                    localStorage.removeItem('board');
                                    localStorage.removeItem('player1');
                                    localStorage.removeItem('player2');
                                    localStorage.removeItem('ties');
                                    localStorage.removeItem('victory1');
                                    localStorage.removeItem('victory2');
                                }}>
                                    <FontAwesomeIcon icon={faPlay} className="mr-2" />
                                    Play
                                </Link>
                            </button>                    
                        </div>
                    </div>
                </li>
                <li className="pt-3 pb-0 sm:pt-4">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="flex-shrink-0">
                            <img className="w-8 h-8" src={hard} alt="hard icon"/>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold truncate ">
                                Hard mode
                            </p>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                3-hit tic tac toe
                            </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                            <button className="yellow-btn">
                                <Link to="/game" onClick={() => {
                                    setGame({mode: 'multiplayer', difficulty:'hard'});
                                    localStorage.removeItem('board');
                                    localStorage.removeItem('player1');
                                    localStorage.removeItem('player2');
                                    localStorage.removeItem('ties');
                                    localStorage.removeItem('victory1');
                                    localStorage.removeItem('victory2');
                                    }}>
                                    <FontAwesomeIcon icon={faPlay} className="mr-2" />
                                    Play
                                </Link>
                            </button>                    
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}
