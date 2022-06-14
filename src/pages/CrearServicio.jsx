import React from 'react'
import { Link } from 'react-router-dom'

export const CrearServicio = () => {
  return (
    <>
      <div className='ml-auto mb-6 mt-6 lg:w-[100%] xl:w-[100%] 2xl:w-[100%]'>
        {/* <!-- Navegador --> */}
        <div className='sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5'>
          <div className='px-6 flex items-center justify-between space-x-4 2xl:container'>
            <Link to={'/gestionAvanzada'}>
              <a
                href='dGestion.html'
                aria-label='return'
                className='w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6 ml-1.5 mt-1.5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6'
                  />
                </svg>
              </a>
            </Link>
            <h5 hidden className='text-2xl text-gray-600 font-left lg:block'>
              Crear Servicio
            </h5>
          </div>
        </div>
      </div>
      <div className='max-w-2xl mx-auto bg-white p-8 lg:w-[100%]'>
        <form>
          <div className='grid gap-6 mb-6 lg:grid-cols-2'>
            <div>
              <label
                for='e_nombre'
                className='block mb-2 text-sm font-medium text-gray-900'
              >
                Categoria
              </label>
              <input
                type='text'
                id='e_nombre'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                placeholder=''
                required
              />
            </div>
            <div>
              <label
                for='e_nombre'
                className='block mb-2 text-sm font-medium text-gray-900'
              >
                Titulo
              </label>
              <input
                type='text'
                id='e_nombre'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                placeholder=''
                required
              />
            </div>
            <div>
              <label
                for='e_nombre'
                className='block mb-2 text-sm font-medium text-gray-900'
              >
                Jornada
              </label>
              <input
                type='text'
                id='e_nombre'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                placeholder=''
                required
              />
            </div>
            <div>
              <label
                for='e_nombre'
                className='block mb-2 text-sm font-medium text-gray-900'
              >
                Precio Colombia
              </label>
              <input
                type='text'
                id='e_nombre'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                placeholder=''
                required
              />
            </div>
            <div>
              <label
                for='e_nombre'
                className='block mb-2 text-sm font-medium text-gray-900'
              >
                Precio España
              </label>
              <input
                type='text'
                id='e_nombre'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                placeholder=''
                required
              />
            </div>
            <div>
              <label
                for='e_nombre'
                className='block mb-2 text-sm font-medium text-gray-900'
              >
                Precio Canada
              </label>
              <input
                type='text'
                id='e_nombre'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                placeholder=''
                required
              />
            </div>
            <div>
              <label
                for='e_nombre'
                className='block mb-2 text-sm font-medium text-gray-900'
              >
                Preferencias
              </label>
              <input
                type='text'
                id='e_nombre'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                placeholder=''
                required
              />
            </div>
            <div>
              <label
                for='e_nombre'
                className='block mb-2 text-sm font-medium text-gray-900'
              >
                Información Del Servicio
              </label>
              <input
                type='text'
                id='e_nombre'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                placeholder=''
                required
              />
            </div>
          </div>
          <br />
          <div className='grid gap-6 mb-6'>
            <div>
              <label for='myfile'>Imagen Del Servicio:</label>
              <input type='file' id='myfile' name='myfile' />
            </div>
          </div>
          <button
            type='submit'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
          >
            Ingresar
          </button>
        </form>
      </div>
      <br></br>
    </>
  )
}
