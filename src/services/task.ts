import { TASK_MANAGER_API_URL } from "~/config/constants"
import { getToken } from "./auth"

export const reorderTasks = async (columnId: string, orderneredTasksIds: string[]) => {
    const res = await fetch(`${TASK_MANAGER_API_URL}/tasks/reorder`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ columnId, orderneredTasksIds }),
    });

    if (!res.ok) throw new Error("Failed to reorder tasks");

    return res.json();
}