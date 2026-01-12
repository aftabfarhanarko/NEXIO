import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import useAxiosAPi from "../hook/useAPi";
import LoadingSpinner from "../Components/LoadingSpinner";

const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const axiosApi = useAxiosAPi();

  const { data: role, isLoading } = useQuery({
    queryKey: ["singleUserRole", user?.email],
    queryFn: async () => {
      const res = await axiosApi.get(`singleUserRole?email=${user.email}`);
      return res.data.role; // 👉 only "admin"
    },
  });

  // 🔄 loading state
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // ❌ not admin
  if (role !== "admin") {
    return <Navigate to="/notAdmin" replace />;
  }

  // ✅ admin access
  return children;
};

export default AdminRoute;
