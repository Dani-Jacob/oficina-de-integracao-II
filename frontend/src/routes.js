import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Voluntarios from "./Pages/Voluntarios";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import CadVolPage from "./Pages/CadVolPage"
import CadOficinaPage from "./Pages/CadOficinaPage"
import Oficinas from "./Pages/Oficinas";
import Certificados from "./Pages/Certificados";

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
                    <Route path='/Voluntarios/:id/Oficinas' element={<Oficinas/>}/>
                    <Route path='/Voluntarios/:id/Oficinas/:oficinaId' element={<CadOficinaPage/>}/>
                    <Route path='/Voluntarios/:id/Oficinas/Nova' element={<CadOficinaPage/>}/>

                    <Route path='/Voluntarios/:id/Certificados' element={<Certificados/>}/>
                
                </Route>

                <Route path='*' element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;