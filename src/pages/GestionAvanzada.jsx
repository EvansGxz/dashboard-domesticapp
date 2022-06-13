import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Navegador } from '../components/Navegador'
import { Sidebar } from '../components/Sidebar'
import { indexAdmin } from '../services/admin-services'
import { deleteCategory, indexCategories } from '../services/categories-services'
import { deleteUser } from '../services/users-service'

export const GestionAvanzada = () => {
  const [mods, setMod] = useState(null);
  const [categories, setCategories] = useState(null);
  useEffect(() => {
    indexCategories().then(setCategories)
  }, [setCategories])

  function handleDelete(id){
    deleteCategory(id).then(() => {
      window.location.reload();
     });}
  useEffect(() => {
    indexAdmin().then(setMod)
  }, [setMod])

  function handleDeleteUser(id){
     deleteUser(id).then(() => {
      window.location.reload();
     });
  }
  return (
    <>
      <Sidebar></Sidebar>
      <div class='ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]'>
        <Navegador titulo='Gestion Avanzada'></Navegador>
        {/*Crear servisio*/}
        <div class='px-6 2xl:container'>
          <div class='grid gap-6'>
            <div class='max-w-2xl mx-auto bg-white p-8 lg:w-[100%]'>
              <div class=''>
                <div class=''>
                  <div class='ml-60 flex justify-center gap-4'>
                    <h3 class='text-3xl font-bold text-gray-700'>Moderadores</h3>
                    <Link to={'/gestion/create'}>
                      <a
                        href='/#'
                        class='ml-24 relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-sky-500 hover:bg-sky-700'
                      >
                        Crear Moderador
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Tabla Servicios */}
            {
              mods ? (
              <>
                <table className='table-auto table text-white border-separate space-y-6 text-sm w-full border-collapse'>
            <thead className='text-black'>
              <tr>
                <th className='p-3 text-left'>Nombre</th>
                <th className='p-3 text-left'>Correo</th>
                <th className='p-3 text-left'>Rol</th>
                <th className='p-3 text-left'>Acción</th>
              </tr>
            </thead>
            <tbody>
              {mods.map((empleado, index) => {
                return (
                  <tr key={index} className='bg-gray-100'>
                    <td className='p-3 text-black'>{empleado.admin.nickname}</td>
                    <td className='p-3 text-black'>{empleado.admin.email}</td>
                    <td className='p-3 text-black'>{empleado.admin.role}</td>
                    <td className='p-3 flex flex-row'>
                      <Link 
                      className='text-gray-600 hover:text-cyan-300'
                      to={`/gestion/edit?id=${empleado.admin.user_id}`}>
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
                      <div id={empleado.admin.user_id} onClick={()=>handleDeleteUser(empleado.admin.user_id)}
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
                  </tr>
                  
                )
              })}
            </tbody>
          </table>
              </>
            ) : (
              <h2>No se encontraron empleados</h2>
            )
          }
        {/* Crear Servicio */}
        <div class='px-6 2xl:container'>
          <div class='grid gap-6'>
            <div class='max-w-2xl mx-auto bg-white p-8 lg:w-[100%]'>
              <div class=''>
                <div class=''>
                  <div class='ml-60 flex justify-center gap-4'>
                    <h3 class='text-3xl font-bold text-gray-700'>Servicios</h3>
                    <Link to={'/servicios/create'}>
                      <a
                        href='/#'
                        class='ml-24 relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-sky-500 hover:bg-sky-700'
                      >
                        Crear Servicio
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Tabla Servicios */}
        {
            categories ? (
              <>
              <table class='table-auto table text-white border-separate space-y-6 text-sm w-full border-collapse'>
            <thead class='text-black'>
              <tr>
                <th class='p-3 text-left'>Servicio</th>
                <th class='p-3 text-left'>Precio</th>
                <th class='p-3 text-left'>Region</th>
                <th className='p-3 text-left'>Acción</th>
              </tr>
            </thead>
            <tbody>
                {categories.map((category, index) => {
                return (
                  <tr key={index} class='bg-gray-100'>
                    <td class='p-3'>
                      <div class='flex align-items-center'>
                        <div class='ml-3'>
                          <div class='text-black font-bold'>
                            {category.category_name}
                          </div>
                      
                        </div>
                      </div>
                    </td>
                    <td class='p-3 text-black'>{category.price}</td>
                    <td class='p-3 text-black'>{category.region}</td>
                    <td className='p-3 flex flex-row'>
                      <Link 
                      className='text-gray-600 hover:text-cyan-300'
                      to={`/servicios/edit?id=${category.id}`}>
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
    </>
  )
}
