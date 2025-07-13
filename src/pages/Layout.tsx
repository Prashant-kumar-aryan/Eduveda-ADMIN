import React, { useContext } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

export const ProtectedRoutes = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const { isLoggedin, loading } = useContext(AuthContext);

  if (loading) return null; // or <Spinner />

  return isLoggedin ? children : <Navigate to="/login" replace />;
};

const Layout = () => {
  return (
    <div>
      <Toaster />
      <ProtectedRoutes>
        <Outlet />
      </ProtectedRoutes>
    </div>
  );
};

export default Layout;
