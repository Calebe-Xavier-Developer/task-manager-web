import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '~/components/ConfirmModal';
import ModalForm from '~/components/ModalForm';
import { Board, createBoard, deleteBoard, getBoards } from '~/services/boards';


const BoardsPage = () => {
    const navigate = useNavigate();
    const [boards, setBoards] = useState<Board[]>([]);
    const [loading, setLoading] = useState(true);
    const [newBoardName, setNewBoardName] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [boardToDelete, setBoardToDelete] = useState<Board | null>(null);

  const fetchBoards = async () => {
    setLoading(true);
    try {
      const data = await getBoards();
      setBoards(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

    const handleCreateBoard = async () => {
    try {
      await createBoard(newBoardName);
      setShowCreateModal(false);
      setNewBoardName('');
      fetchBoards();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteBoard = async () => {
    if (!boardToDelete) return;
    try {
      await deleteBoard(boardToDelete.id);
      setShowDeleteModal(false);
      setBoardToDelete(null);
      fetchBoards();
    } catch (err) {
      console.error(err);
    }
  };
    

  return (
    <div className='p-6'>
        <h1 className='text-2xl font-bold mb-4'>Your Boards</h1>
        <button
            className='mb-6 bg-green-600 text-white px-4 py-2 rounded'
            onClick={() => setShowCreateModal(true)}
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
                        <button
                            className='flex-1 bg-red-600 text-white px-4 py-1 rounded'
                            onClick={() => {
                                setBoardToDelete(board);
                                setShowDeleteModal(true);
                            }}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        )}
        {showCreateModal && (
            <ModalForm
            title="Create Board"
            value={newBoardName}
            setValue={setNewBoardName}
            onClose={() => setShowCreateModal(false)}
            onConfirm={handleCreateBoard}
            />
        )}

        {showDeleteModal && boardToDelete && (
            <ConfirmModal
            title="Delete Board"
            message={`Are you sure you want to delete "${boardToDelete.name}"?`}
            onCancel={() => setShowDeleteModal(false)}
            onConfirm={handleDeleteBoard}
            />
        )}
    </div>
  )
}

export default BoardsPage