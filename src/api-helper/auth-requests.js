import axios from "axios";

const api = axios.create({baseURL:"http://localhost:5000/auth"})

export const login = async(loginInfo) =>
 await api.post("/login", loginInfo)
 .then(res => {
    localStorage.setItem("authToken", res.data.token)
    api.defaults.headers.common.authorization = `Bearer ${res.data.token}`
    return res.data
 }).catch(err => err)

 export const verify = async() => {
    const token = localStorage.getItem("authToken")
    console.log(token)
    return await api.post("/verify", {token: token})
    .then(res => {
    console.log(res.data) 
    return res}).catch(err => err)
 }