import React from 'react'
import { Navegador } from '../components/Navegador'
import { Sidebar } from '../components/Sidebar'
import { reportes } from '../data/ReportesData'

export const Reportes = () => {
  return (
    <>
      <Sidebar></Sidebar>
      <div class='ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]'>
        <Navegador titulo='Reportes'></Navegador>
        <div class='px-6 pt-6 2xl:container'>
          <div class='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
            {reportes.map((reporte, index) => {
              return (
                <div key={index}>
                  <div class='lg:h-full px-6 text-gray-600 rounded-xl border border-gray-200 bg-white'>
                    <div class='mt-4'>
                      <div class='mt-2 flex justify-center gap-4'>
                        <h3 class='text-3xl font-bold text-gray-700'>
                          {reporte.nombre}
                        </h3>
                      </div>
                      <h5 class='text-base text-gray-700 text-center'>
                        {reporte.desc}
                      </h5>
                      <div class='mt-2 mb-4 flex justify-center gap-4'>
                        <span class='block text-center text-gray-500'>
                          {reporte.fecha}
                        </span>
                        <br />
                        <span class='block text-center text-gray-500'>
                          {reporte.telefono}
                        </span>
                      </div>
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
