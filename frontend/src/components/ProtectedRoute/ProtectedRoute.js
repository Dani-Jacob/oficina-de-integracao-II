import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../../Services/authService";
import { ExpandOutlined } from "@mui/icons-material";

function ProtectedRoute() {


    const isAuth =  isAuthenticated();

    if(!isAuth){
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;