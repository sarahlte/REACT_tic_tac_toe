import { useState } from 'react';
import first from '../assets/1st-prize.png'
import second from '../assets/2nd-place.png'
import third from '../assets/3rd-place.png'

export default function Ranking() {
    const [players, setPlayers] = useState([{rank: 1, name:'test'}, {rank:2, name:'test2'}, {rank: 3, name:'test3'}, {rank: 4, name:'test4'}, {rank:5, name:'Test5'}])

    function PlayersRank({rank, name}) {
        if(rank == 1){
            return (
                <li className="pt-3 pb-0 sm:pt-4">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="flex-shrink-0">
                            <img className="w-8 h-8" src={first} alt="easy icon"/>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold truncate">
                                {name}
                            </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                            <p></p>                    
                        </div>
                    </div>
                </li>
            )
        } else if (rank == 2){
            return (
                <li className="pt-3 pb-0 sm:pt-4">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="flex-shrink-0">
                            <img className="w-8 h-8" src={second} alt="easy icon"/>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold truncate">
                                {name}
                            </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                            <p></p>                    
                        </div>
                    </div>
                </li>
            ) 
        } else if (rank == 3){
            return (
                <li className="pt-3 pb-0 sm:pt-4">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="flex-shrink-0">
                            <img className="w-8 h-8" src={third} alt="easy icon"/>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold truncate">
                                {name}
                            </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                            <p></p>                    
                        </div>
                    </div>
                </li>
            )
        }
        return (
            <li className="pt-3 pb-0 sm:pt-4">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="flex-shrink-0">
                        <p className='w-8 h-8'>{rank}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate">
                            {name}
                        </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        <p></p>                    
                    </div>
                </div>
            </li>
        )
    }

    return (
        <div className="flex flex-col items-center">        
            <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                <li className="pb-3 sm:pb-4">
                    <div className="flex items-center justify-start space-x-4 rtl:space-x-reverse">
                        <h1>Ranking</h1>
                    </div>
                </li>
                {players.map((player) => (
                    <PlayersRank key={player.rank} rank = {player.rank} name={player.name} />
                ))}
            </ul>
        </div>
    )
}
