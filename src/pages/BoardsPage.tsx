import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Board, getBoards } from '~/services/boards';


const BoardsPage = () => {
    const [boards, setBoards] = useState<Board[]>([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getBoards()
        .then(setBoards)
        .catch(console.error)
        .finally(() => setLoading(false));
    }, []);
    

  return (
    <div className='p-6'>
        <h1 className='text-2xl font-bold mb-4'>Tour Boards</h1>
        <button
            className='mb-6 bg-green-600 text-white px-4 py-2 rounded'
            onClick={() => navigate('/boards/new')}
        >
            + Create New Board
        </button>

        {loading ? (
            <p>Loading...</p>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {boards.map((board) => (
                    <div key={board.id} className='p-4 bg-white shadow rounded cursor-pointer hover:bg-blue-50'>
                        <span>{board.name}</span>
                        <button
                            className='bg-blue-600 text-white px-4 py-2 rounded'
                            onClick={() => navigate(`/boards/${board.id}`)}
                        >
                            View
                        </button>
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default BoardsPage