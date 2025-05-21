import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { c } from 'node_modules/vite/dist/node/moduleRunnerTransport.d-DJ_mE5sf';
import React, { useState } from 'react'
import SortableTask from './SortableTask';
import { reorderTasks } from '~/services/task';

type Task = {
    id: string;
    title: string;
}

interface ColumnProps {
    id: string;
    name: string;
    initialTasks: Task[];
}


const Column = ({ id, name, initialTasks }: ColumnProps) => {
    const [tasks, setTasks] = useState(initialTasks);

    const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
    }));


  return (
    <div className='bg-gray-100 p-4 rounded w-64 min-w-[256px]'>
        <h2 className='text-lg font-semibold mb-4'>{name}</h2>

        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={(event) => {
                const { active, over } = event;

                if (active.id !== over?.id) {
                    const oldIndex = tasks.findIndex((t) => t.id === active.id);
                    const newIndex = tasks.findIndex((t) => t.id === over?.id);

                    const reordered = arrayMove(tasks, oldIndex, newIndex);
                    setTasks(reordered);

                    const orderedIds = reordered.map((task) => task.id);
                    reorderTasks(id, orderedIds);
                }
            }}
        >
            <SortableContext
                items={tasks.map((task) => task.id)}
                strategy={verticalListSortingStrategy}    
            >
                <div className='space-y-2'>
                    {tasks.map((task) => (
                        <SortableTask key={task.id} task={task} />
                    ))}
                </div>
            </SortableContext>

        </DndContext>
    </div>
  )
}

export default Column