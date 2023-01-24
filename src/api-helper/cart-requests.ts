import axios from "axios";

const api = axios.create({baseURL:"http://localhost:5000/users"})

interface ICartProps {
    user_id: string | number,
    product_id: string | number
}

export const addToCart = async(userProductId:ICartProps) =>{
   console.log(userProductId)
 await api.post("/add-to-cart", userProductId)
 .then(res =>res ).catch(err => err)}

 export const removeFromCart = async(userProductId:ICartProps) =>
 await api.delete("/remove-from-cart", {data:userProductId})
 .then(res => res).catch(err => err)