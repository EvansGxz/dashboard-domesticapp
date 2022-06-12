import { Link } from 'react-router-dom'
import { BuscarEmpleados } from '../components/BuscarEmpleados'
import { Navegador } from '../components/Navegador'
import { Sidebar } from '../components/Sidebar'
import { EmpleadosData } from '../data/EmpleadosData'

export const Empleados = () => {
  return (
    <>
      <Sidebar></Sidebar>
      <div class='ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]'>
        <Navegador titulo='Empleados'></Navegador>
        <div class='px-6 pt-6 2xl:container'>
          <BuscarEmpleados></BuscarEmpleados>
          {/* tabla */}
          <table class='table-auto table text-white border-separate space-y-6 text-sm w-full border-collapse'>
            <thead class='text-black'>
              <tr>
                <th class='p-3 text-left'>Empleado</th>
                <th class='p-3 text-left'>Pais</th>
                <th class='p-3 text-left'>Region</th>
                <th class='p-3 text-left'>Documento</th>
                <th class='p-3 text-left'>Acción</th>
              </tr>
            </thead>
            <tbody>
              {EmpleadosData.map((empleado, index) => {
                return (
                  <tr key={index} class='bg-gray-100'>
                    <td class='p-3'>
                      <div class='flex align-items-center'>
                        <div class='ml-3'>
                          <div class='text-black font-bold'>
                            {empleado.nombre}
                          </div>
                          <div class='text-black'>{empleado.correo}</div>
                        </div>
                      </div>
                    </td>
                    <td class='p-3 text-black'>{empleado.pais}</td>
                    <td class='p-3 text-black'>{empleado.region}</td>
                    <td class='p-3 text-black'>{empleado.documento}</td>
                    <td class='p-3 flex flex-row'>
                      <Link to={'/editarEmpleado'}>
                        <a
                          href='./editarEmpleado'
                          class='text-gray-600 hover:text-cyan-300'
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            class='h-6 w-6'
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
                        class='text-gray-600 hover:text-cyan-300 ml-4'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          class='h-6 w-6'
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
