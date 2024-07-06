import axios from "axios";

const baseURL = "http://localhost:3001/persons";

const create = (newObject) => {
  return axios.post(baseURL, newObject);
};

const delatePhoneNum = (id) => {
  return axios.delete(`${baseURL}/${id}`);
};

export default { create, delatePhoneNum };
