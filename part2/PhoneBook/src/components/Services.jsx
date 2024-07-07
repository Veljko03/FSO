import axios from "axios";

const baseURL = "http://localhost:3001/persons";

const create = (newObject) => {
  return axios.post(baseURL, newObject);
};

const delatePhoneNum = (id) => {
  return axios.delete(`${baseURL}/${id}`);
};

const change = (id, newObject) => {
  return axios.put(`${baseURL}/${id}`, newObject);
};

export default { create, delatePhoneNum, change };
