import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./components/auth/Login";
import NuevaCuenta from "./components/auth/NuevaCuenta";
import Proyectos from "./components/proyectos/Proyectos";
import RutaPrivada from "./components/rutas/RutaPrivada";
import tokenAuth from "./config/token";
import AlertaState from "./context/alertas/alertaState";
import AuthState from "./context/autenticacion/authState";

import ProyectoState from "./context/proyectos/proyectoState";
import TareaState from "./context/tareas/tareaState";

// Revisar si tenemos un token
const token = localStorage.getItem('token')

if (token) {
  tokenAuth(token)
}

function App() {
  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <BrowserRouter>
                <Routes>
                    <Route end path="/" element={<Login />} />
                    <Route end path="/nueva-cuenta" element={<NuevaCuenta />} />
                     
                    <Route end path="/proyectos" element={
                      <RutaPrivada>
                        <Proyectos />
                      </RutaPrivada>
                    } />
                </Routes>
            </BrowserRouter>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
