import React from 'react'
import { Link } from 'react-router-dom'
import { Navegador } from '../components/Navegador'
import { Sidebar } from '../components/Sidebar'
import { servicios } from '../data/ServiciosData'

export const GestionAvanzada = () => {
  return (
    <>
      <Sidebar></Sidebar>
      <div class='ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]'>
        <Navegador titulo='Gestion Avanzada'></Navegador>
        {/* Empleados de Gestion */}
        <div class='px-6 pt-6 2xl:container'>
          <div class='grid gap-6'>
            <div class='max-w-2xl mx-auto bg-white p-8 lg:w-[100%]'>
              <div class=''>
                <div class='mt-6'>
                  <div class='mt-2 flex justify-center gap-4'>
                    <h3 class='text-3xl font-bold text-gray-700'>
                      Empleados De Gestión
                    </h3>
                  </div>
                </div>
              </div>
              <br />
              <form>
                <div class='grid gap-6 mb-6 lg:grid-cols-2'>
                  <div>
                    <label
                      for='g_email'
                      class='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                    >
                      Correo Electronico
                    </label>
                    <input
                      type='email'
                      id='g_email'
                      class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                      placeholder=''
                      required
                    />
                  </div>
                  <div>
                    <label
                      for='g_password'
                      class='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                    >
                      Contraseña
                    </label>
                    <input
                      type='password'
                      id='g_password'
                      class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                      placeholder=''
                      required
                    />
                  </div>
                </div>
                <br />
                <button
                  type='submit'
                  class='text-white bg-sky-500 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
                >
                  Crear Empleado de Gestión
                </button>
              </form>
            </div>
          </div>
        </div>
        {/* Crear Servicio */}
        <div class='px-6 2xl:container'>
          <div class='grid gap-6'>
            <div class='max-w-2xl mx-auto bg-white p-8 lg:w-[100%]'>
              <div class=''>
                <div class=''>
                  <div class='ml-60 flex justify-center gap-4'>
                    <h3 class='text-3xl font-bold text-gray-700'>Servicios</h3>
                    <Link to={'/crearServicio'}>
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
        <div class='px-6 2xl:container'>
          <table class='table-auto table text-white border-separate space-y-6 text-sm w-full'>
            <thead class='text-black'>
              <tr>
                <th class='p-3 text-left'>Categoria</th>
                <th class='p-3 text-left'>Titulo</th>
                <th class='p-3 text-left'>Jornada</th>
                <th class='p-3 text-left'>Precio</th>
                <th class='p-3 text-left'>Preferencias</th>
                <th class='p-3 text-left'>Información del servicio</th>
                <th class='p-3 text-left'>Imagen</th>
                <th class='p-3 text-left'>Acción</th>
              </tr>
            </thead>
            <tbody>
              {servicios.map((servicio, index) => {
                return (
                  <tr key={index} class='bg-gray-100'>
                    <td class='p-3 text-black'>{servicio.categoria}</td>
                    <td class='p-3 text-black'>{servicio.titulo}</td>
                    <td class='p-3 text-black'>{servicio.jornada}</td>
                    <td class='p-3'>
                      <div class='flex align-items-center'>
                        <div class=''>
                          <div class='text-black'>
                            <div>{servicio.precio}</div>
                          </div>
                          <div class='text-black'>
                            <div>{servicio.precio}</div>
                          </div>
                          <div class='text-black'>
                            <div>{servicio.precio}</div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class='p-3 text-black'>{servicio.preferencias}</td>
                    <td class='p-3 text-black'>{servicio.informacion}</td>
                    <td class='p-3 text-black'>
                      <img
                        src={servicio.imagen}
                        alt=''
                        class='h-20 w-20 rounded-full'
                      />
                    </td>
                    <td class='grid grid-cols-2'>
                      <Link to={'/editarServicio'}>
                        <a
                          href='/#'
                          class='text-gray-600 hover:text-cyan-300 h-8 w-8'
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            class='h-8 w-8'
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
                        </a>
                      </Link>
                      <a
                        href='/#'
                        class='text-gray-600 hover:text-cyan-300 h-8 w-8'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          class='mt-2'
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
                      </a>
                      <a
                        href='/#'
                        class='text-gray-600 hover:text-cyan-300 h-8 w-8'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          class='mt-7'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                          stroke-width='2'
                        >
                          <path
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                          />
                        </svg>
                      </a>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
