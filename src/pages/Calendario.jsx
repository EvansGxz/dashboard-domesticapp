import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Navegador } from '../components/Navegador'
import { Sidebar } from '../components/Sidebar'
import { deleteOrder, indexOrder } from '../services/order-details-services'
import CrearOrder from './Order/createOrdr'
import $ from 'jquery'



export const Calendario = () => {
  $.DataTable = require('datatables.net')
  const [categories, setCategories] = useState(null);
  useEffect(() => {
    indexOrder().then(setCategories)
  }, [setCategories])
  
  function handleDelete(id){
    deleteOrder(id).then(() => {
      window.location.reload();
     });}
     if (categories){
      $('#dataTable').DataTable()
     }
  return (
    <>
      <Sidebar></Sidebar>
      <div className='ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]'>
        <Navegador titulo='Servicios dados'></Navegador>
        <div className='px-6 2xl:container'>
          <div className='grid gap-6'>
            <div className='max-w-2xl mx-auto bg-white p-8 lg:w-[100%]'>
              <div className=''>
                <div className=''>
                  <div className='ml-60 flex justify-center gap-4'>
                    <h3 className='text-3xl font-bold text-gray-700'>Servicios</h3>                    
                    <input type="checkbox" id="btn-modal"/>
                    <label htmlFor="btn-modal" className='ml-24 relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-sky-500 hover:bg-sky-700'>Crear Order</label>
                    <div class="modal">
                      <div class="contenedor">
                        <header>Crear Order</header>
                        <label className="contenedor_label" htmlFor="btn-modal">X</label>
                        <div className="contenido">
                          <ContainerAll>
                            <CrearOrder/>
                          </ContainerAll>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>      

          {
            categories ? (
              <>
                <div class="container mx-auto">
                  <div class="flex flex-col">
                    <div class="w-full">
                      <div class="p-4 border-b border-gray-200 shadow">
                      
                        <table id="dataTable" class="p-4">
                          <thead class="bg-gray-50">
                              <tr>
                                  <th class="p-8 text-xs text-gray-500">
                                    ID
                                  </th>
                                  <th class="p-8 text-xs text-gray-500">
                                    Cliente
                                  </th>
                                  <th class="p-8 text-xs text-gray-500">
                                    Empleado
                                  </th>
                                  <th class="p-8 text-xs text-gray-500">
                                    Servcio
                                  </th>
                                  <th class="p-8 text-xs text-gray-500">
                                    Fecha
                                  </th>
                                  <th class="p-8 text-xs text-gray-500">
                                    Servcio
                                  </th>
                                  <th class="p-8 text-xs text-gray-500">
                                    Activo
                                  </th>
                                  <th class="px-6 py-2 text-xs text-gray-500">
                                      Edit
                                  </th>
                                  <th class="px-6 py-2 text-xs text-gray-500">
                                      Delete
                                  </th>
                              </tr>
                          </thead>
                          <tbody class="bg-white">
                            {categories.map((category, index) => {
                            return (
                              <>
                              <tr key={index} class="whitespace-nowrap">
                                                <td class="px-6 py-4 text-sm text-center text-gray-500">
                                                {category.id}
                                                </td>
                                                <td class="px-6 py-4 text-center">
                                                    <div class="text-sm text-gray-900">
                                                    {category.customer.full_name}
                                                    </div>
                                                </td>
                                                <td class="px-6 py-4 text-center">
                                                    <div class="text-sm text-gray-500">{category.employee.full_name}</div>
                                                </td>
                                                <td class="px-6 py-4 text-sm text-center text-gray-500">
                                                {category.category.category_name}
                                                </td>
                                                <td class="px-6 py-4 text-sm text-center text-gray-500">
                                                {category.start_date}
                                                </td>
                                                <td class="px-6 py-4 text-sm text-center text-gray-500">
                                                {category.workday}
                                                </td>
                                                {category.active ? (<td className="px-6 py-4 text-sm text-center text-gray-500">Si</td>) : (
                                                <td className="px-6 py-4 text-sm text-center text-gray-500">No</td>
                                                  )}
                                                <td class="px-6 py-4 text-center">         
                                                    <Link 
                                                  className='px-4 py-1 text-sm text-white bg-blue-400 rounded'
                                                  to={`/calendar/edit?id=${category.id}`}>Edit</Link>
                                                </td>
                                                <div id={category.id} onClick={()=>handleDelete(category.id)}>
                                                <td class="px-6 py-4 text-center">
                                                    <div href="#" class="px-4 py-1 text-sm text-white bg-red-400 rounded">Delete</div>
                                                </td></div>
                                            </tr>
                                            </>)
                          })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <h2>No se encontraron Clientes</h2>
            )
          } </div>  
    </div>
    </>
  )
}

export const ContainerAll = styled.div`
  flex-direction: column;
  width: 50vw;
  background-color: $fff;
  margin: 0 auto;
  border-radius: 30px;
  justify-content: space-between;
  align-content: center;
  height: 50vh;
  padding-left: 18rem;
  padding-top: 5rem;
`;