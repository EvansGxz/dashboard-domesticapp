import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Navegador } from '../components/Navegador'
import { Sidebar } from '../components/Sidebar'
import { indexEmployee } from '../services/employee-service'
import { deleteUser } from '../services/users-service'
import CrearEmpleado from "./Empleado/createEmployee"

const Empleados = () => {
  const [employess, setEmployees] = useState(null);
  useEffect(() => {
    indexEmployee().then(setEmployees)
  }, [setEmployees])

  function handleDelete(id){
     deleteUser(id).then(() => {
      window.location.reload();
     });
  }
  return (
    <>
      <Sidebar></Sidebar>
      <div className='ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]'>
        <Navegador titulo='Empleados'></Navegador>
        <div className='px-6 2xl:container'>
          <div className='grid gap-6'>
            <div className='max-w-2xl mx-auto bg-white p-8 lg:w-[100%]'>
              <div className=''>
                <div className=''>
                  <div className='ml-60 flex justify-center gap-4'>
                    <h3 className='text-3xl font-bold text-gray-700'>Empleados</h3>                    
                    <input type="checkbox" id="btn-modal"/>
      <label htmlFor="btn-modal" className='ml-24 relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-sky-500 hover:bg-sky-700'>Crear Empleado</label>
      <div class="modal">
        <div class="contenedor">
          <header>Crear Empleado</header>
          <label className="contenedor_label" htmlFor="btn-modal">X</label>
          <div className="contenido">
            <ContainerAll>
            <CrearEmpleado />
            </ContainerAll>
          </div>
        </div>
      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
          {/* tabla */}
          {
            employess ? (
              <>
                <table className='table-auto table text-white border-separate space-y-6 text-sm w-full border-collapse'>
            <thead className='text-black'>
              <tr>
                <th className='p-3 text-left'>Empleado</th>
                <th className='p-3 text-left'>Pais</th>
                <th className='p-3 text-left'>Region</th>
                <th className='p-3 text-left'>Documento</th>
                <th className='p-3 text-left'>Acción</th>
              </tr>
            </thead>
            <tbody>
              {employess.map((empleado, index) => {
                return (
                  <tr key={index} className='bg-gray-100'>
                    <td className='p-3'>
                      <div className='flex align-items-center'>
                        <div className='ml-3'>
                          <div className='text-black font-bold'>
                            {empleado.employee.full_name}
                          </div>
                          <div className='text-black'>{empleado.employee.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className='p-3 text-black'>{empleado.employee.country}</td>
                    <td className='p-3 text-black'>{empleado.employee.region}</td>
                    <td className='p-3 text-black'>{empleado.employee.document_id}</td>
                    <td className='p-3 flex flex-row'>
                      <Link 
                      className='text-gray-600 hover:text-cyan-300'
                      to={`/empleados/edit?id=${empleado.employee.user_id}`}>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-6 w-6'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                          strokeWidth='2'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                          />
                        </svg>
                      </Link>
                      <div id={empleado.employee.user_id} onClick={()=>handleDelete(empleado.employee.user_id)}
                        className='text-gray-600 hover:text-cyan-300 ml-4'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-6 w-6'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                          strokeWidth='2'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
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
          
          
        </div>
      </div>
    </>
  )
}
const ContainerAll = styled.div`
  padding-left: 1.225rem;
`;
export default Empleados;