import instance from "./axiosInstance";

export const loginAdmin = async (email, password) => {
  return await instance.post("/admin/login", { email, password });
};
