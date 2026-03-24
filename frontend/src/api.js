// import axios from 'axios';

// const Api = axios.create({
//     baseURL: "http://localhost:8000",
// });
// export const addEquipment = (data) => API.post("/equipment", data);
// export const getEquipment = () => API.get("/equipment");

// export default Api;

import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});
export const getEquipment = async () => {
  const res = await axios.get(`${API}/equipment`);
  return res.data;
};

// POST - Add Equipment
export const addEquipment = (data) => {
  return API.post("/equipment", data);
};
 
// GET - Get Equipment
// export const getEquipment = () => {
//   return API.get("/equipment");
// };

export const createLabBooking = (data) => API.post("/lab-booking", data);

export default API;