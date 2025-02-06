import axios from "axios";

const BASE_URL = 'http://localhost:8080/api/task';

export const taskList = () => axios.get(BASE_URL);
export const copyTask = (task) => axios.post(BASE_URL + '/copy', task);


