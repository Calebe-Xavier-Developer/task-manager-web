import { TASK_MANAGER_API_URL } from "~/config/constants";


export const login = async (email: string, password: string): Promise<string> => {
  const res = await fetch(`${TASK_MANAGER_API_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Invalid credentials");

  const { access_token: token } = await res.json();

  localStorage.setItem("token", token);

  return token;
}

export const getToken = (): string | null => localStorage.getItem("token");


export const logout = (): string | null => localStorage.remove("token");