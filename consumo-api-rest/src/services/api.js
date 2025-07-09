import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // tu backend local
});

export const getTasks = () => api.get('/task');
export const addTask = (data) => api.post('/task', data);
export const updateTask = (id, data) => api.put(`/task/${id}`, data);
export const deleteTask = (id) => api.delete(`/task/${id}`);


export const registerUser = (data) => api.post('/auth/register', data);
export const loginUser = (data) => api.post('/auth/login', data);
