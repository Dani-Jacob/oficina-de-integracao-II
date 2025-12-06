import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/Login' element={<Login/>}/>

                <Route element={<ProtectedRoute/>}>
                
                <Route path='/Home' element={<Home/>}/>
                </Route>

                <Route path='*' element={<h1>Not found</h1>} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;