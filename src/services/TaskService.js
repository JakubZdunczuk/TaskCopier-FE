import axios from "axios";

const BASE_URL = 'http://localhost:8080/api/v1';

export const tasksList = () => axios.get(BASE_URL + '/tasks');
export const projectsList = () => axios.get(BASE_URL + '/projects');
export const createTask = (task, projectId) => axios.post(BASE_URL + '/projects/'+ projectId + '/tasks', task);


