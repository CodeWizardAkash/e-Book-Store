import API from "./api.service";

//signup
export const signup = async (userData)=>{
    const res = await API.post("/users/signup", userData);
    return res.data;
}

//login
export const login = async (userData)=>{
    const res = await API.post("/users/login", userData, {
        withCredentials: true,
    });
    return res.data;
}

// Logout
export const logout = async () => {
  const res = await API.post("/users/logout", {}, {
    withCredentials: true,
  });
  return res.data;
};
