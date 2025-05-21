
import { closestCenter, DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import React, { useEffect, useState } from 'react'
import { set } from 'react-hook-form';
import { useParams } from 'react-router-dom'
import Column from '~/components/Column';
import { getBoardByid, reorderColumns } from '~/services/boards';
import { createColumn } from '~/services/column';

type Task = {
  id: string;
  title: string;
  position: number;
};

type Column = {
  id: string;
  name: string;
  tasks: Task[];
};


const BoardDetailPage = () => {
    const { id: boardId } = useParams();
    const [columns, setColumns] = useState<Column[]>([]);
    const [isCreatingColumn, setIsCreatingColumn] = useState(false);
    const [newColumnName, setNewColumnName] = useState('');

    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));;

    useEffect(() => {
      if (!boardId) return;

      getBoardByid(boardId)
        .then((data) => { setColumns(data.columns) })
        .catch((err) => { console.error(err) });
    }, [boardId]);

    const handleCreateColumn = async () => {
        if (!boardId || !newColumnName.trim()) return;

        try {
            const createdColumn = await createColumn(boardId, newColumnName.trim());
            setColumns((prev) => [...prev, createdColumn]);
            setNewColumnName('');
            setIsCreatingColumn(false);
        } catch (error) { console.error('Error creating column:', error) }
    }
    

    return (
        <div className='p-6 overflow-x-auto'>
            <h1 className='text-2xl font-bold mb-6'>Board View</h1>

            <DndContext 
                collisionDetection={closestCenter} 
                sensors={sensors} 
                onDragEnd={({  active, over }) => {
                    if (active.id !== over?.id) {
                        const oldIndex = columns.findIndex((c) => c.id === active.id);
                        const newIndex = columns.findIndex((c) => c.id === over?.id);

                        const reordered = arrayMove(columns, oldIndex, newIndex);
                        setColumns(reordered);

                        const orderedIds = reordered.map((column) => column.id);
                        reorderColumns(boardId!, orderedIds);
                    }
                }                }
            >
                <div className='flex gap-4'>
                    {columns.map((column) => (
                        <Column 
                            key={column.id}
                            id={column.id}
                            name={column.name}
                            initialTasks={column.tasks}
                        />
                    ))}
                </div>
                <div className="min-w-[256px]">
                    {isCreatingColumn ? (
                        <div className="bg-gray-100 p-4 rounded h-full">
                        <input
                            className="w-full p-2 border rounded mb-2"
                            value={newColumnName}
                            onChange={(e) => setNewColumnName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleCreateColumn()}
                            placeholder="Column name"
                        />
                        <button className="text-sm text-blue-600" onClick={handleCreateColumn}>Add</button>
                        <button className="text-sm text-gray-500 ml-2" onClick={() => setIsCreatingColumn(false)}>Cancel</button>
                        </div>
                    ) : (
                        <button
                        className="text-sm text-blue-600"
                        onClick={() => setIsCreatingColumn(true)}
                        >
                        + Add Column
                        </button>
                    )}
                </div>
            </DndContext>
        </div>
    )
}

export default BoardDetailPage