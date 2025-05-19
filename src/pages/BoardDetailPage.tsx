
import { closestCenter, DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import React, { useEffect, useState } from 'react'
import { set } from 'react-hook-form';
import { useParams } from 'react-router-dom'
import Column from '~/components/Column';
import { getBoardByid } from '~/services/boards';

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
                        <Column 
                            key={column.id}
                            id={column.id}
                            name={column.name}
                            initialTasks={column.tasks}
                        />
                    ))}
                </div>
            </DndContext>
        </div>
    )
}

export default BoardDetailPage