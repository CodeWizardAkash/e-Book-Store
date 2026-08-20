import API from "./api.service";

export const getAllBooks = async (search = "") => {
  const response = await API.get("/books", {
    params: {
      search,
    },
  });

  return response.data;
};

export const getBookById = async (id) => {
  const res = await API.get(`/books/${id}`);
  return res.data;
};

export const getPopularBooks = async () => {
  const response = await API.get("/books/popular");
  return response.data;
};