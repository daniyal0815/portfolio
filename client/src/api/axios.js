import instance from "./axios"; // make sure path is correct

export const loginAdmin = async (email, password) => {
  return await instance.post("/api/admin/login", {
    email,
    password,
  });
};
