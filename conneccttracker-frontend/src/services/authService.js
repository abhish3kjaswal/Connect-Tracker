import API from "./api";

export const registerUser = async (formData) => {
  const res = await API.post("/users/register", formData);

  return res.data;
};

// login user

export const loginUser = async (formData) => {
  const res = await API.post("/users/login", formData);
  return res.data;
};
