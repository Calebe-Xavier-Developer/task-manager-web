import { TASK_MANAGER_API_URL } from "~/config/constants"
import { getToken } from "./auth"

export const getBoards = async () => {
    const res = await fetch(`${TASK_MANAGER_API_URL}/boards`,{
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });

    if (!res.ok) throw new Error("Failed to fetch boards");

    return res.json();
}