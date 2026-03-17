import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
    const token = sessionStorage.getItem("adminToken");

    if (!token) {
        return <Navigate to="/" replace />
    }

    return children;
}
export default PrivateRoute;