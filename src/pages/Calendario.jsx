import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Navegador } from '../components/Navegador'
import { Sidebar } from '../components/Sidebar'
import { useAuth } from '../context/auth-context'
import { deleteOrder, indexOrder } from '../services/order-details-services'

export const Calendario = () => {
  const { user } = useAuth();
  const [categories, setCategories] = useState(null);
  useEffect(() => {
    indexOrder().then(setCategories)
  }, [setCategories])

  function handleDelete(id){
    deleteOrder(id).then(() => {
      window.location.reload();
     });}
  return (
    <>
      <Sidebar></Sidebar>
      <div class='ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]'>
        <Navegador titulo='Servicios dados'></Navegador>
        <div class='px-6 2xl:container'>
          <div class='grid gap-6'>
            <div class='max-w-2xl mx-auto bg-white p-8 lg:w-[100%]'>
              <div class=''>
                <div class=''>
                  <div class='ml-60 flex justify-center gap-4'>
                    <h3 class='text-3xl font-bold text-gray-700'>Servicios</h3>
                    {user.role === 'admin' ? (
                      <>
                          <Link to={'/calendar/create'}>
                          <a
                            href='/#'
                            class='ml-24 relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-sky-500 hover:bg-sky-700'
                          >
                            Crear Servicio
                          </a>
                        </Link>
                      </>
                    ) : null}
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class='px-6 pt-6 2xl:container'>
          <div class='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {
            categories ? (
              <>
              <table class='table-auto table text-white border-separate space-y-6 text-sm w-full border-collapse'>
            <thead class='text-black'>
              <tr>
                <th class='p-3 text-left'>Cliente</th>
                <th class='p-3 text-left'>Empleado</th>
                <th class='p-3 text-left'>Servcio</th>
                <th className='p-3 text-left'>Fecha</th>
                <th className='p-3 text-left'>Jornada</th>
                <th className='p-3 text-left'>Activo</th>
                <th className='p-3 text-left'>Action</th>
              </tr>
            </thead>
            <tbody>
                {categories.map((category, index) => {
                return (
                  <tr key={index} class='bg-gray-100'>
                    <td class='p-3 text-black'>{category.customer.full_name}</td>
                    <td class='p-3 text-black'>{category.employee.full_name}</td>
                    <td class='p-3 text-black'>{category.category.category_name}</td>
                    <td class='p-3 text-black'>{category.start_date}</td>
                    <td class='p-3 text-black'>{category.workday}</td>
                    {category.active ? (<td class='p-3 text-black'>Si</td>) : (
                      <td class='p-3 text-black'>No</td>
                    )}
                    {user.role === 'admin' ? (
                      <>
                      <td className='p-3 flex flex-row'>
                      <Link 
                      className='text-gray-600 hover:text-cyan-300'
                      to={`/calendar/edit?id=${category.id}`}>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-6 w-6'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                          stroke-width='2'
                        >
                          <path
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                          />
                        </svg>
                      </Link>
                      <div id={category.id} onClick={()=>handleDelete(category.id)}
                        className='text-gray-600 hover:text-cyan-300 ml-4'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-6 w-6'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                          stroke-width='2'
                        >
                          <path
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                          />
                        </svg>
                      </div>
                    </td>
                      </>
                    ) : null}
                    
                  </tr>
                )
              })}
              </tbody>
          </table>
              </>
            ) : (
              <h2>No se encontraron Clientes</h2>
            )
          }   
          </div>
        </div>
      </div>
    </>
  )
}
