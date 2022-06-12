import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Empleados } from '../pages/Empleados'
import { GestionAvanzada } from '../pages/GestionAvanzada'
import { Estadisticas } from '../pages/Estadisticas'
import { Clientes } from '../pages/Clientes'
import { Calendario } from '../pages/Calendario'
import { Cupones } from '../pages/Cupones'
import { Reportes } from '../pages/Reportes'
import { CrearEmpleado } from '../pages/CrearEmpleado'
import { EditarEmpleado } from '../pages/EditarEmpleado'
import { EditarServicio } from '../pages/EditarServicio'
import { Login } from '../pages/Login'
import { CrearServicio } from '../pages/CrearServicio'

export const NavPage = () => {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/' element={<Empleados />}></Route>
        <Route path='/gestionAvanzada' element={<GestionAvanzada />}></Route>
        <Route path='/estadisticas' element={<Estadisticas />}></Route>
        <Route path='/calendario' element={<Calendario />}></Route>
        <Route path='/clientes' element={<Clientes />}></Route>
        <Route path='/cupones' element={<Cupones />}></Route>
        <Route path='/reportes' element={<Reportes />}></Route>
        <Route path='/crearEmpleado' element={<CrearEmpleado />}></Route>
        <Route path='/editarEmpleado' element={<EditarEmpleado />}></Route>
        <Route path='/editarServicio' element={<EditarServicio />}></Route>
        <Route path='/crearServicio' element={<CrearServicio />}></Route>
      </Routes>
    </>
  )
}
