import { useState } from 'react';
import first from '../assets/1st-prize.png'
import second from '../assets/2nd-place.png'
import third from '../assets/3rd-place.png'

export default function Ranking() {
    const [players, setPlayers] = useState(localStorage.getItem('ranking')? localStorage.getItem('ranking') : JSON.stringify([{username: 'Kappa', score: 12}, {username: 'Pierre', score: 9},{username: 'Paul', score: 7}, {username: 'Marie', score: 6}, {username: 'Sarah', score: 3}, {username: 'Tom', score: 1}]))

    const users = JSON.parse(players);

    function PlayersRank({rank, name, bestScore}) {
        if(rank == 1){
            return (
                <tr className="pt-3 pb-0 sm:pt-4">
                        <td className="flex justify-center">
                            <img className="w-8 h-8" src={first} alt="easy icon"/>
                        </td>
                        <td className="min-w-0">
                            <p className="text-sm font-bold truncate">
                                {name}
                            </p>
                        </td>
                        <td className="flex justify-center">
                            <p>{bestScore}</p>                    
                        </td>
                </tr>
            )
        } else if (rank == 2){
            return (
                <tr className="pt-3 pb-0 sm:pt-4">
                        <td className="flex justify-center">
                            <img className="w-8 h-8" src={second} alt="easy icon"/>
                        </td>
                        <td className="min-w-0">
                            <p className="text-sm font-bold truncate">
                                {name}
                            </p>
                        </td>
                        <td className="flex justify-center">
                            <p>{bestScore}</p>                    
                        </td>
                </tr>
            ) 
        } else if (rank == 3){
            return (
                <tr className="pt-3 pb-0 sm:pt-4">
                        <td className="flex justify-center">
                            <img className="w-8 h-8" src={third} alt="easy icon"/>
                        </td>
                        <td className="min-w-0">
                            <p className="text-sm font-bold truncate">
                                {name}
                            </p>
                        </td>
                        <td className="flex justify-center">
                            <p>{bestScore}</p>                    
                        </td>
                </tr>
            )
        }
        return (
            <tr className="pt-3 pb-0 sm:pt-4">
                    <td className="flex justify-center">
                        <p className='w-8 h-8 text-center'>{rank}</p>
                    </td>
                    <td className="min-w-0">
                        <p className="text-sm font-bold truncate">
                            {name}
                        </p>
                    </td>
                    <td className="flex justify-center">
                        <p>{bestScore}</p>                    
                    </td>
            </tr>
        )
    }

    console.log(users)
    return (
        <div className="flex flex-col items-center">  
            <h1>Ranking</h1>  
            <table className='table w-[50%]'>
                <thead>
                    <tr>
                        <th className='flex justify-center'>Rank</th>
                        <th>Username</th>
                        <th className='flex justify-center'>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((player, index) => (
                        <PlayersRank key={index} rank={index+1} name={player.username} bestScore={player.score} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}
