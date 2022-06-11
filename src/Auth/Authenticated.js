import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { Navigate } from "react-router-dom";

function Authenticated() {
  const { user } = useAuth();
  return (
    <>
      <Routes>
      <Route path="/" element={<h2>Calendar</h2>} />
      <Route path="/*" element={<h2>Calendar</h2>} />
      <Route path="/calendar" element={<h2>Calendar</h2>} />

      <Route path="/clientes" element={<h2>Clientes</h2>} />
      <Route path="/cupones" element={<h2>Cupones</h2>} />
      <Route path="/reportes" element={<h2>Reportes y eventualidades</h2>} />
      <Route path="/empleados" element={<h2>Empleados</h2>} />
      <Route path="/soporte" element={<h2>Chat de Soporte</h2>} />
      <Route path="/estadisica" element={<h2>Estadisticas</h2>} />
      <Route path="/capacitaciones" element={<h2>Capacitaciones</h2>} />
      <Route path="/gestion" element={<h2>Gestion Avanzada</h2>} />
      </Routes>
    </>
  );
}
export default Authenticated;
