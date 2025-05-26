import { TASK_MANAGER_API_URL } from "~/config/constants"
import { getToken } from "./auth"

export interface Board {
  id: string;
  name: string;
}

export const createBoard = async (name: string): Promise<Board> => {
  const res = await fetch(`${TASK_MANAGER_API_URL}/boards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ name }),
  });

  if (!res.ok) throw new Error('Failed to create board');
  return res.json();
};

export const getBoards = async (): Promise<Board[]> => {
  const res = await fetch(`${TASK_MANAGER_API_URL}/boards`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) throw new Error('Failed to fetch boards');
  return res.json();
};

export const getBoardByid = async (id: string) => {
    const res = await fetch(`${TASK_MANAGER_API_URL}/boards/${id}`,{
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });

    if (!res.ok) throw new Error("Failed to fetch board");
    return res.json();
}

export const reorderColumns = async (boardId: string, columnsIds: string[]) => {
    const res = await fetch(`${TASK_MANAGER_API_URL}/boards-columns/reorder`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ boardId, columnsIds }),
    });

    if (!res.ok) throw new Error("Failed to reorder columns");

    return res.json();
}

export const deleteBoard = async (id: string): Promise<void> => {
  const res = await fetch(`${TASK_MANAGER_API_URL}/boards/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) throw new Error('Failed to delete board');
  return res.json();
};
