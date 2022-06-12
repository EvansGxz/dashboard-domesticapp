import React from 'react'
import { Navegador } from '../components/Navegador'
import { Sidebar } from '../components/Sidebar'
import { cupones } from '../data/CuponesData'

export const Cupones = () => {
  return (
    <>
      <Sidebar></Sidebar>
      <div class='ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]'>
        <Navegador titulo='Cupones'></Navegador>
        <div class='px-6 pt-6 2xl:container'>
          <div class='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
            {cupones.map((cupon, index) => {
              return (
                <div class='lg:h-full py-8 px-6 rounded-xl border border-gray-300 bg-white'>
                  <div class='mt-6'>
                    <h5 class='text-xl text-gray-700 text-center'>
                      Tiempo restante:{cupon.tiempo}
                    </h5>
                    <div class='mt-2 flex justify-center gap-4'>
                      <h3 class='text-3xl font-bold text-gray-700'>
                        {cupon.desc}
                      </h3>
                    </div>
                    <div class='mt-2 flex justify-center gap-4'>
                      <button class='block text-center text-gray-500 hover:text-cyan-400'>
                        MODIFICAR
                      </button>
                      <br />
                      <button class='block text-center text-gray-500 hover:text-cyan-400'>
                        ELIMINAR
                      </button>
                      <br />
                      <button class='block text-center text-gray-500 hover:text-cyan-400'>
                        NOTIFICAR
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
            <a href='/#'>
              <div class='lg:h-full py-11 px-6 text-gray-600 rounded-xl border border-gray-200 bg-gradient-to-r from-sky-600 to-cyan-400  hover:text-white'>
                <div class='mt-6 mt-2 flex justify-center gap-4'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    class='h-14 w-14'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    stroke-width='2'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M12 4v16m8-8H4'
                    />
                  </svg>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
