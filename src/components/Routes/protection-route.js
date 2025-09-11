import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
export function ProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/sign_in" />;
}
