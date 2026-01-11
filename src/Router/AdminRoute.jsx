import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../context/AuthContext";
import useAxiosAPi from "../hook/useAPi";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const axiosApi = useAxiosAPi();
  const location = useLocation();

  const { data: role, isLoading } = useQuery({
    queryKey: ["singleUserRole", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosApi.get(`singleUserRole?email=${user.email}`);
      return res.data.role; // 👉 only "admin"
    },
  });

  // 🔄 loading state
  if (loading || isLoading) {
    return <div>Loading...</div>;
  }

  // ❌ not logged in
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ❌ not admin
  if (role !== "admin") {
    return <Navigate to="/notAdmin" replace />;
  }

  // ✅ admin access
  return children;
};

export default AdminRoute;
