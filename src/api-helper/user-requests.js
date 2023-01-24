import axios from "axios";

const api = axios.create({baseURL:"http://localhost:5000/users"})

export const getOneUser = async(id) => 
await api.get(`/${id}`).then(res => res).catch(err => err)