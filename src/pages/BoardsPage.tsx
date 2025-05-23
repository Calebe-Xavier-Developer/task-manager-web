import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBoards } from '~/services/boards';

type Board = {
    id: string;
    name: string;
}

const BoardsPage = () => {
    const [boards, setBoards] = useState<Board[]>([]);
    const navigate = useNavigate();


    useEffect(() => {
      getBoards().then(setBoards).catch((err) => {console.log(err)})
    }, [])
    

  return (
    <div className='p-6'>
        <h1 className='text-2xl font-bold mb-4'>Tour Boards</h1>
        <button
            className='mb-6 bg-green-600 text-white px-4 py-2 rounded'
            onClick={() => navigate('/boards/new')}
        >
            + Create New Board
        </button>

        <ul className='space-y-2'>
            {boards.map((board) => (
                <li key={board.id} className='border p-4 rounded flex justify-between items-center'>
                    <span>{board.name}</span>
                    <button
                        className='bg-blue-600 text-white px-4 py-2 rounded'
                        onClick={() => navigate(`/boards/${board.id}`)}
                    >
                        View
                    </button>
                </li>
            ))}
        </ul>

    </div>
  )
}

export default BoardsPage