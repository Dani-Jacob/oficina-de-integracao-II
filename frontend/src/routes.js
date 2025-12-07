import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Voluntarios from "./Pages/Voluntarios";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import CadVolPage from "./Pages/CadVolPage"

function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/Login' element={<Login/>}/>

                <Route element={<ProtectedRoute/>}>
                  <Route path='/Voluntario' element={<CadVolPage/>}/>
                  <Route path='/Voluntario/:id' element={<CadVolPage/>}/>
                
                    <Route path='/Home' element={<Home/>}/>
                    <Route path='/Voluntarios' element={<Voluntarios/>}/>
                
                </Route>

                <Route path='*' element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;