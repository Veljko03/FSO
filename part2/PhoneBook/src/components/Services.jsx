import axios from "axios";

const baseURL = "/api/persons";

const create = (newObject) => {
  return axios.post(baseURL, newObject);
};

const delatePhoneNum = (id) => {
  return axios.delete(`${baseURL}/${id}`);
};

const change = (id, newObject) => {
  return axios.put(`${baseURL}/${id}`, newObject);
};

const getAll = () => {
  return axios.get(baseURL);
};

export default { create, delatePhoneNum, change, getAll };
