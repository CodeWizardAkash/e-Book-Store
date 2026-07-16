import axios from "axios";

const API = axios.create({
    baseURL : "http://localhost:5000/api",
});

export const getAllBooks = async ()=>{
    const response = await API.get("/books");
    return response.data;
}
