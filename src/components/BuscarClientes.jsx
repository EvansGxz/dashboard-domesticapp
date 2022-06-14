import React from 'react'
import { Link } from 'react-router-dom'

export const BuscarClientes = () => {
  return (
    <>
      <div className='flex space-x-4'>
        {/* search bar  */}
        <div hidden className='md:block'>
          <div className='relative flex items-center text-gray-400 focus-within:text-cyan-400'>
            <span className='absolute left-4 h-6 flex items-center pr-3 border-r border-cyan-400'>
              <svg
                xmlns='http://ww50w3.org/2000/svg'
                className='w-4 fill-current'
                viewBox='0 0 35.997 36.004'
              >
                <path
                  id='Icon_awesome-search'
                  data-name='search'
                  d='M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z'
                ></path>
              </svg>
            </span>
            <input
              type='search'
              name='leadingIcon'
              id='leadingIcon'
              placeholder='Search here'
              className='w-full pl-14 pr-4 py-2.5 rounded-xl text-sm text-gray-600 outline-none border border-cyan-400 focus:border-cyan-300 transition'
            />
          </div>
        </div>
        {/* search bar */}
        <button
          aria-label='search'
          className='w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200 md:hidden'
        >
          <svg
            xmlns='http://ww50w3.org/2000/svg'
            className='w-4 mx-auto fill-current text-gray-600'
            viewBox='0 0 35.997 36.004'
          >
            <path
              id='Icon_awesome-search'
              data-name='search'
              d='M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z'
            ></path>
          </svg>
        </button>
        <Link to={'/clientes/create'}>
          <a
            href='/#'
            className='relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-sky-500 hover:bg-sky-700'
          >
            Crear Cliente
          </a>
        </Link>
      </div>
      <br></br>
    </>
  )
}
