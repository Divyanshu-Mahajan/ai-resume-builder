import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "../UI/Card";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useSelector((state) => state.auth);

    if(loading){
        return(
            <Card>
                Loading...
            </Card>
        )
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
