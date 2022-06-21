import * as React from "react";
import { Routes, Route } from "react-router-dom";
import CrearMod from "../pages/Admins/createMod";
import EditMod from "../pages/Admins/editMod";
import Cal from "../pages/Caal";
import { Calendario } from "../pages/Calendario";
import Clientes from "../pages/Clientes";
import { ClientCalendario } from "../pages/Clientes/clientCalendar";
import CrearCliente from "../pages/Clientes/createCliente";
import EditarCliente from "../pages/Clientes/editCliente";
import Cupones from "../pages/Cupones";
import CreateCupon from "../pages/Cupons/createCupon";
import DeleteCupon from "../pages/Cupons/deleteCupon";
import ModifyCupon from "../pages/Cupons/modifyCupon";
import { EditarEmpleado } from "../pages/EditarEmpleado";
import CreateEmployee from "../pages/Empleado/createEmployee";
import EditEmployee from "../pages/Empleado/editEmloyee";
import { EmployeeCalendario } from "../pages/Empleado/employeeCalendar";
import Empleados from "../pages/Empleados";
import { Estadisticas } from "../pages/Estadisticas";
import { GestionAvanzada } from "../pages/GestionAvanzada";
import Habilidades from "../pages/Habilidades";
import EditarHEabilidad from "../pages/Habilidades Empleados/editHE";
import EditarHabilidad from "../pages/Habilidades/editHabilidad";
import Login from "../pages/login";
import News from "../pages/Newslatter";
import EditNew from "../pages/NewsLatter/editNews";
import CrearOrder from "../pages/Order/createOrdr";
import EditarOrder from "../pages/Order/editOrder";
import { Reportes } from "../pages/Reportes";
import CrearServicio from "../pages/Servicios/crearServicio";
import EditarServicio from "../pages/Servicios/editarServicio";
import Tareas from "../pages/Tareas";
import EditarTarea from "../pages/Tareas/edtTarea";


function Authenticated() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Calendario/>} />
        <Route path="/*" element={<Calendario/>} />
        <Route path="/calendar" element={<Calendario/>} />
        <Route path="/calendar/edit" element={<EditarOrder/>} />
        <Route path="/calendar/create" element={<CrearOrder/>} />

        <Route path="/habilidades" element={<Habilidades/>} />
        <Route path="/habilidades/edit" element={<EditarHabilidad/>} />
        <Route path="/habilidades_he/edit" element={<EditarHEabilidad/>} />

        <Route path="/news" element={<News/>} />
        <Route path="/news/edit" element={<EditNew/>} />

        <Route path="/tareas" element={<Tareas/>} />
        <Route path="/tareas/edit" element={<EditarTarea/>} />
        <Route path="/cal" element={<Cal/>} />

        <Route path="/clientes" element={<Clientes/>} />
        <Route path="/clientes/edit" element={<EditarCliente/>} />
        <Route path="/clientes/create" element={<CrearCliente/>} />
        <Route path="/clientes/calendar" element={<ClientCalendario/>} />
        <Route path="/empleados/calendar" element={<EmployeeCalendario/>} />

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

        <Route path="/login" element={<Login />} />

      </Routes>
    </>
  );
}
export default Authenticated;
