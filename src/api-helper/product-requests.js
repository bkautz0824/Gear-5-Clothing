import axios from "axios";

const api = axios.create({baseURL:"http://localhost:5000/products"})


export const getOneProduct = async(id) => 
await api.get(`/${id}`).then(res => res).catch(err => err)
