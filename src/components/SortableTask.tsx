import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


interface TaskProps {
    task: {
        id: string;
        title: string;
    }
}

const SortableTask = ({ task }: TaskProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }
  
  
    return (
    <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className='p-2 bg-white rounded shadow hover:bg-gray-50 cursor-move'
    >
        {task.title}
    </div>
  )
}

export default SortableTask