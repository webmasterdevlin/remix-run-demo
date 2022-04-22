import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/",
});

export async function get<T>(path: string) {
  return await api.get<T>(path);
}

export async function deleteById(path: string, id: string) {
  return await api.delete<void>(`${path}/${id}`);
}

export async function post<T>(path: string, obj: T) {
  return await api.post<T>(path, obj);
}

export async function put<T>(path: string, obj: T | any) {
  return await api.put<T>(`${path}/${obj.id}`, obj);
}
