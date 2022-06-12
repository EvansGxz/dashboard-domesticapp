import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Clientes from "../pages/Clientes";
import Cupons from "../pages/cupons";
import CreateCupon from "../pages/Cupons/createCupon";
import DeleteCupon from "../pages/Cupons/deleteCupon";
import ModifyCupon from "../pages/Cupons/modifyCupon";
import CreateEmployee from "../pages/Empleado/createEmployee";
import EditEmployee from "../pages/Empleado/editEmloyee";
import Empleados from "../pages/Empleados";


function Authenticated() {
  return (
    <>
      <Routes>
        <Route path="/" element={<h2>Calendar</h2>} />
        <Route path="/*" element={<h2>Calendar</h2>} />
        <Route path="/calendar" element={<h2>Calendar</h2>} />

        <Route path="/navbar" element={<h2>Calendar</h2>} />
        <Route path="/clientes" element={<Clientes/>} />
        <Route path="/cupones" element={<Cupons/>} />
        <Route path="/cupones/create_cupon" element={<CreateCupon/>} />
        <Route path="/cupones/modify_cupon" element={<ModifyCupon/>} />
        <Route path="/cupones/delete_cupon" element={<DeleteCupon/>} />
        <Route path="/reportes" element={<h2>Reportes y eventualidades</h2>} />
        <Route path="/empleados" element={<Empleados/>} />
        <Route path="/empleados/edit" element={<EditEmployee/>} />
        <Route path="/empleados/create" element={<CreateEmployee/>} />
        <Route path="/soporte" element={<h2>Chat de Soporte</h2>} />
        <Route path="/estadisica" element={<h2>Calendar</h2>} />
        <Route path="/capacitaciones" element={<h2>Capacitaciones</h2>} />
        <Route path="/gestion" element={<h2>Calendar</h2>} />
        <Route path="/servicios" element={<h2>Calendar</h2>} />
      </Routes>
    </>
  );
}
export default Authenticated;
