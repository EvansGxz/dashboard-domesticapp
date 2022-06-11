import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Admins from "../pages/admins";
import Cupons from "../pages/cupons";
import CreateEmployee from "../pages/Empleado/createEmployee";
import EditEmployee from "../pages/Empleado/editEmloyee";
import Empleados from "../pages/employees";
import Stats from "../pages/estadistica";
import Servicios from "../pages/servicios";

function Authenticated() {
  return (
    <>
      <Routes>
        <Route path="/" element={<h2>Calendar</h2>} />
        <Route path="/*" element={<h2>Calendar</h2>} />
        <Route path="/calendar" element={<h2>Calendar</h2>} />

        <Route path="/clientes" element={<h2>Clientes</h2>} />
        <Route path="/cupones" element={<Cupons/>} />
        <Route path="/reportes" element={<h2>Reportes y eventualidades</h2>} />
        <Route path="/empleados" element={<Empleados/>} />
        <Route path="/empleados/edit" element={<EditEmployee/>} />
        <Route path="/empleados/create" element={<CreateEmployee/>} />
        <Route path="/soporte" element={<h2>Chat de Soporte</h2>} />
        <Route path="/estadisica" element={<Stats/>} />
        <Route path="/capacitaciones" element={<h2>Capacitaciones</h2>} />
        <Route path="/gestion" element={<Admins />} />
        <Route path="/servicios" element={<Servicios />} />
      </Routes>
    </>
  );
}
export default Authenticated;
