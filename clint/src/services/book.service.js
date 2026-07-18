import axios from "axios";
import API from "./api.service";

export const getAllBooks = async ()=>{
    const response = await API.get("/books");
    return response.data;
}
