import axios from "axios";

export const API = axios.create({
    baseURL : import.meta.env.VITE_API_URL,
});

export const getAllBooks = async ()=>{
    const response = await API.get("/books");
    return response.data;
}
