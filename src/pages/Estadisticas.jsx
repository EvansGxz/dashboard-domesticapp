import React from 'react'
import { Navegador } from '../components/Navegador'
import { Sidebar } from '../components/Sidebar'
import { estadisticas } from '../data/EstadisticasData'

export const Estadisticas = () => {
  return (
    <>
      <Sidebar></Sidebar>
      <div class='ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]'>
        <Navegador titulo='Estadisticas'></Navegador>
        <div class='px-6 pt-6 2xl:container'>
          <div class='grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12'>
            {estadisticas.map((estadistica, index) => {
              return (
                <div key={index} class='md:col-span-2 lg:col-span-1'>
                  <div class='h-full py-8 px-6 space-y-6 rounded-xl border border-gray-200 bg-white'>
                    <div class='border-b border-b-sky-500'>
                      <h5 class='text-xl text-gray-600 text-center'>
                        {estadistica.titulo}
                      </h5>
                    </div>
                    <div>
                      <div class='mt-2 flex justify-center gap-4'>
                        <h3 class='text-3xl font-bold text-gray-700'>
                          {estadistica.horas}
                        </h3>
                      </div>
                      <span class='block text-center text-gray-500'>
                        {estadistica.dia}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
