
import { closestCenter, DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import React, { useEffect, useState } from 'react'
import { set } from 'react-hook-form';
import { useParams } from 'react-router-dom'
import { getBoardByid } from '~/services/boards';

type Task = {
    id: string;
    title: string;
}

type Column = {
    id: string;
    name: string;
    tasks: Task[];
}


const BoardDetailPage = () => {
    const { id } = useParams();
    const [columns, setColumns] = useState<Column[]>([]);

    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));;

    useEffect(() => {
      if (!id) return;

      getBoardByid(id)
        .then((data) => { setColumns(data.columns) })
        .catch((err) => { console.error(err) });
    }, [id]);
    

    return (
        <div className='p-6 overflow-x-auto'>
            <h1 className='text-2xl font-bold mb-6'>Board View</h1>

            <DndContext collisionDetection={closestCenter} sensors={sensors}>
                <div className='flex gap-4'>
                    {columns.map((column) => (
                        <div key={column.id} className='bg-gray-100 p-4 rounded w-64 min-w-[256px]'>
                            <h2 className='text-lg font-semibold mb-4'>{column.name}</h2>
                            <div className='space-y-2'>
                                {column.tasks.map((task) => (
                                    <div key={task.id} className='bg-white p-2 rounded shadow hover:bg-gray-50'>
                                        {task.title}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </DndContext>
        </div>
    )
}

export default BoardDetailPage