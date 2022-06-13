import * as React from "react";
import { Routes, Route } from "react-router-dom";
import CrearMod from "../pages/Admins/createMod";
import EditMod from "../pages/Admins/editMod";
import { Calendario } from "../pages/Calendario";
import Clientes from "../pages/Clientes";
import CrearCliente from "../pages/Clientes/createCliente";
import EditarCliente from "../pages/Clientes/editCliente";
import Cupones from "../pages/Cupones";
import CreateCupon from "../pages/Cupons/createCupon";
import DeleteCupon from "../pages/Cupons/deleteCupon";
import ModifyCupon from "../pages/Cupons/modifyCupon";
import { EditarEmpleado } from "../pages/EditarEmpleado";
import CreateEmployee from "../pages/Empleado/createEmployee";
import EditEmployee from "../pages/Empleado/editEmloyee";
import Empleados from "../pages/Empleados";
import { Estadisticas } from "../pages/Estadisticas";
import { GestionAvanzada } from "../pages/GestionAvanzada";
import CrearOrder from "../pages/Order/createOrdr";
import EditarOrder from "../pages/Order/editOrder";
import { Reportes } from "../pages/Reportes";
import CrearServicio from "../pages/Servicios/crearServicio";
import EditarServicio from "../pages/Servicios/editarServicio";


function Authenticated() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Calendario/>} />
        <Route path="/*" element={<Calendario/>} />
        <Route path="/calendar" element={<Calendario/>} />
        <Route path="/calendar/edit" element={<EditarOrder/>} />
        <Route path="/calendar/create" element={<CrearOrder/>} />

        <Route path="/navbar" element={<Calendario/>} />
        <Route path="/clientes" element={<Clientes/>} />
        <Route path="/clientes/edit" element={<EditarCliente/>} />
        <Route path="/clientes/create" element={<CrearCliente/>} />
        <Route path="/cupones" element={<Cupones/>} />
        <Route path="/cupones/create_cupon" element={<CreateCupon/>} />
        <Route path="/cupones/modify_cupon" element={<ModifyCupon/>} />
        <Route path="/cupones/delete_cupon" element={<DeleteCupon/>} />
        <Route path="/reportes" element={<Reportes/>} />
        <Route path="/empleados" element={<Empleados/>} />
        <Route path="/empleados/edit" element={<EditEmployee/>} />
        <Route path="/empleados/create" element={<CreateEmployee/>} />
        <Route path="/soporte" element={<h2>Chat de Soporte</h2>} />
        <Route path="/estadisica" element={<Estadisticas/>} />
        <Route path="/capacitaciones" element={<EditarEmpleado/>} />
        <Route path="/gestion" element={<GestionAvanzada/>} />
        <Route path="/servicios" element={<Calendario/>} />
        <Route path="/servicios/create" element={<CrearServicio/>} />
        <Route path="/servicios/edit" element={<EditarServicio/>} />

        <Route path="/gestion/create" element={<CrearMod/>} />
        <Route path="/gestion/edit" element={<EditMod/>} />
      </Routes>
    </>
  );
}
export default Authenticated;
