import instance from "./axiosInstance";

export const loginAdmin = async (email, password) => {
  return await instance.post("/api/admin/login", { email, password });
};
