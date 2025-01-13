import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUsers, faRobot, faPlay } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router'

export default function Homepage() {
    return (
        <div>
            <h1>Choose your game mode</h1>
            <div className="flex">
                <div className="card card-side bg-base-100 shadow-xl mx-4 w-96">
                    <figure>
                        <FontAwesomeIcon icon={faRobot} size="2xl" />
                    </figure>
                    <div className="card-body py-0">
                        <h2 className="card-title">Bot mode</h2>
                        <div className="card-actions justify-start">
                            <p className="grow-0">Game against bot</p>
                        </div>
                        <div className="card-actions justify-end">
                            <button className="yellow-btn">
                                <Link to="/game">
                                    <FontAwesomeIcon icon={faPlay} className="mr-2" />
                                    Play
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card card-side bg-base-100 shadow-xl mx-4 w-69">
                    <figure>
                        <FontAwesomeIcon icon={faUsers} size="2xl"/>
                    </figure>
                    <div className="card-body py-0">
                        <h2 className="card-title">Player mode</h2>
                        <div className="card-actions justify-start">
                            <p className="grow-0">Game against local player</p>
                        </div>                        
                        <div className="card-actions justify-end">
                            <button className="yellow-btn">
                                <Link to="/game">
                                    <FontAwesomeIcon icon={faPlay} className="mr-2" />
                                    Play
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
