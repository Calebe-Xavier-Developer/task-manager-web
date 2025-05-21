import { TASK_MANAGER_API_URL } from "~/config/constants"
import { getToken } from "./auth";

export const createColumn = async (boardId: string, name: string) => {
    const res = await fetch(`${TASK_MANAGER_API_URL}/columns`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ boardId, name }),
    });

    if (!res.ok) throw new Error("Failed to create column");

    return res.json();
}