import { useState } from 'react';
import first from '../assets/1st-prize.png'
import second from '../assets/2nd-place.png'
import third from '../assets/3rd-place.png'

export default function Ranking() {
    const [players, setPlayers] = useState([{rank: 1, name:'test', bestScore:12}, {rank:2, name:'test2', bestScore: 11}, {rank: 3, name:'test3', bestScore: 8}, {rank: 4, name:'test4', bestScore: 5}, {rank:5, name:'Test5', bestScore: 3}])

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

    return (
        <div className="flex flex-col items-center">  
            <h1>Ranking</h1>  
            <table className='table w-[50%]'>
                <thead>
                    <tr>
                        <th className='flex justify-center'>Rank</th>
                        <th>User name</th>
                        <th className='flex justify-center'>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map((player) => (
                        <PlayersRank key={player.rank} rank = {player.rank} name={player.name} bestScore={player.bestScore} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}
