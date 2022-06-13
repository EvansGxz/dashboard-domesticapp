import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { Calendario } from "../pages/Calendario";
import Clientes from "../pages/Clientes";
import CrearCliente from "../pages/Clientes/createCliente";
import EditarCliente from "../pages/Clientes/editCliente";
import Cupons from "../pages/cupons";
import CreateCupon from "../pages/Cupons/createCupon";
import DeleteCupon from "../pages/Cupons/deleteCupon";
import ModifyCupon from "../pages/Cupons/modifyCupon";
import CreateEmployee from "../pages/Empleado/createEmployee";
import EditEmployee from "../pages/Empleado/editEmloyee";
import Empleados from "../pages/Empleados";
import CrearServicio from "../pages/Servicios/crearServicio";
import EditarServicio from "../pages/Servicios/editarServicio";


function Authenticated() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Calendario/>} />
        <Route path="/*" element={<Calendario/>} />
        <Route path="/calendar" element={<Calendario/>} />

        <Route path="/navbar" element={<Calendario/>} />
        <Route path="/clientes" element={<Clientes/>} />
        <Route path="/clientes/edit" element={<EditarCliente/>} />
        <Route path="/clientes/create" element={<CrearCliente/>} />
        <Route path="/cupones" element={<Cupons/>} />
        <Route path="/cupones/create_cupon" element={<CreateCupon/>} />
        <Route path="/cupones/modify_cupon" element={<ModifyCupon/>} />
        <Route path="/cupones/delete_cupon" element={<DeleteCupon/>} />
        <Route path="/reportes" element={<h2>Reportes y eventualidades</h2>} />
        <Route path="/empleados" element={<Empleados/>} />
        <Route path="/empleados/edit" element={<EditEmployee/>} />
        <Route path="/empleados/create" element={<CreateEmployee/>} />
        <Route path="/soporte" element={<h2>Chat de Soporte</h2>} />
        <Route path="/estadisica" element={<Calendario/>} />
        <Route path="/capacitaciones" element={<h2>Capacitaciones</h2>} />
        <Route path="/gestion" element={<Calendario/>} />
        <Route path="/servicios" element={<Calendario/>} />
        <Route path="/servicios/create" element={<CrearServicio/>} />
        <Route path="/servicios/edit" element={<EditarServicio/>} />
      </Routes>
    </>
  );
}
export default Authenticated;
