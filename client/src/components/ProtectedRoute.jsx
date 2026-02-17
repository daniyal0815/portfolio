import { Navigate } from "react-router-dom";
import * as jwt_decode from "jwt-decode"; // ✅ use * as for Vite

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/admin-login" replace />;

  try {
    const decoded = jwt_decode.default(token); // ✅ use .default
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return <Navigate to="/admin-login" replace />;
    }
  } catch (err) {
    localStorage.removeItem("token");
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

export default ProtectedRoute;
