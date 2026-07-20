import API from "./api.service";

//signup
export const signup = async (userData)=>{
    const res = await API.post("/users/signup", userData);
    return res.data;
}

//login
export const login = async (userData)=>{
    const res = await API.post("/users/login", userData);
    return res.data;
}

// Logout
export const logout = async () => {
  const res = await API.post("/users/logout", {},);
  return res.data;
};

//Profile
export const getProfile = async () => {
  const res = await API.get("/users/profile");
  return res.data;
};