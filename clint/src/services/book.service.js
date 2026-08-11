import axios from "axios";
import API from "./api.service";

export const getAllBooks = async ()=>{
    const response = await API.get("/books");
    return response.data;
}

export const getBookById = async (id) => {
  const res = await API.get(`/books/${id}`);
  return res.data;
};
