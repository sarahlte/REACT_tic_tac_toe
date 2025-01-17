import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay } from '@fortawesome/free-solid-svg-icons'

export default function Form({mode, setPlayersName}){
    if(mode=='bot'){
        return (
            <>
                <form className='flex flex-col items-center justify-center my-5' onSubmit={setPlayersName}>
                <div className='flex flex-col items-start justify-center my-3'>
                    <label htmlFor="player1" className='my-2 player1-label' >Player 1</label>
                    <div className="flex w-72 flex-col">
                    <div className="w-full max-w-sm min-w-[200px]">
                        <input name='player1' id='player1' className="player1-input w-full bg-transparent placeholder:text-slate-300 text-white text-sm border border-slate-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-50 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Type here..." />
                    </div>
                    </div>
                </div>
                <button className="lightgrey-btn my-3" type="submit">
                    <FontAwesomeIcon icon={faPlay} className="mr-2" />
                    Play
                </button>
                </form>
            </>
        )
    } else if (mode=='multiplayer'){
        return (
            <>
            <form className='flex flex-col items-center justify-center my-5' onSubmit={setPlayersName}>
                <div className='flex flex-col items-start justify-center my-3'>
                <label htmlFor="player1" className='my-2 player1-label' >Player 1</label>
                <div className="flex w-72 flex-col">
                    <div className="w-full max-w-sm min-w-[200px]">
                    <input name='player1' id='player1' className="player1-input w-full bg-transparent placeholder:text-slate-300 text-white text-sm border border-slate-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-50 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Type here..." />
                    </div>
                </div>
                </div>
                <div className='flex flex-col items-start justify-center my-3'>
                <label htmlFor="player2" className='my-2 player2-label'>Player 2</label>
                <div className="flex w-72 flex-col">
                    <div className="w-full max-w-sm min-w-[200px]">
                    <input name='player2' id='player2' className="player2-input w-full bg-transparent placeholder:text-slate-300 text-white text-sm border border-slate-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-50 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Type here..." />
                    </div>
                </div>
                </div>
                <button className="lightgrey-btn my-3" type="submit">
                    <FontAwesomeIcon icon={faPlay} className="mr-2" />
                    Play
                </button>
            </form>
            </>
        )
    }
}