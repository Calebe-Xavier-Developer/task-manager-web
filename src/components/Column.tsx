import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { c } from 'node_modules/vite/dist/node/moduleRunnerTransport.d-DJ_mE5sf';
import React, { useState } from 'react'
import SortableTask from './SortableTask';
import { createTask, reorderTasks } from '~/services/task';

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
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
    }));

    const handleCreateTask = async () => {
        if (!newTaskTitle.trim()) return;

        try {
            const createdTask = await createTask(id, newTaskTitle.trim());
            setTasks((prev) => [...prev, createdTask]);
            setNewTaskTitle('');
            setIsCreating(false);
        } catch (error) { console.error('Error creating task:', error) }
    }


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
                    {isCreating ? (
                        <div className="mt-2">
                            <input
                                className="w-full p-2 border rounded mb-2"
                                value={newTaskTitle}
                                onChange={(e) => setNewTaskTitle(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleCreateTask()}
                                placeholder="Task title"
                            />
                            <button
                                className="text-sm text-blue-600"
                                onClick={handleCreateTask}
                            >
                                Add
                            </button>
                            <button
                                className="text-sm text-gray-500 ml-2"
                                onClick={() => setIsCreating(false)}
                            >
                                Cancel
                            </button>
                        </div>
                        ) : (
                        <button
                            className="mt-2 text-sm text-blue-600"
                            onClick={() => setIsCreating(true)}
                        >
                            + Add Task
                        </button>
                        )}

                </SortableContext>

            </DndContext>
        </div>
    )
}

export default Column