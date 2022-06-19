import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Navegador } from '../components/Navegador'
import { PopAll } from '../components/popAll'
import { Sidebar } from '../components/Sidebar'
import { indexEmployee } from '../services/employee-service'
import { deleteUser } from '../services/users-service'
import CrearEmpleado from "./Empleado/createEmployee"
import EditarEmpleado from './Empleado/editEmloyee'

const Empleados = () => {
  const [employess, setEmployees] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [cusId, setCusId] = useState(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    indexEmployee().then(setEmployees)
  }, [])

  function handleDelete(id){
     deleteUser(id);
  }

    const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  function toggleEdit(id){
    setShow(!show);
  }

  function onEdit(id){
    setCusId(id);
    toggleEdit();
  }
  
  return (
    <>
     {
      isOpen && <PopAll
      content={<>
      <Box>
      <Title>CREAR EMPLEADO</Title></Box>
      <CrearEmpleado/>
      </>}
      handleClose={togglePopup}
    />
    }
    {
      show && <PopAll
      content={<>
      <Box>
      <Title>EDITAR EMPLEADO</Title></Box>
      {
        cusId ? (<>
          <EditarEmpleado id={cusId}/>
        </>) : null
      }
      
      </>}
      handleClose={toggleEdit}
    />
    }
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
                    <Button onClick={()=>togglePopup()}>Crear</Button>
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
                <th className='p-3 text-left'>Imagen</th>
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
                  <td className='p-3 text-black'><img
                        src={empleado.employee.image_url}
                        alt='category'
                        class='h-14 w-14 rounded-full'
                      /></td>
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
                      <div onClick={()=>onEdit(empleado.employee.user_id)}
                      className='text-gray-600 hover:text-cyan-300'
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
                            d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                          />
                        </svg>
                      </div>
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
                      <Link 
                      className='text-gray-600 hover:text-cyan-300'
                      to={`/empleados/calendar?id=${empleado.employee.id}`}>
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
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </Link>
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

const Button = styled.button`
  display: flex;
  width: "fit-content";
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background-color: #0BBBEF;
  border-radius: 10px;
  color: #FFF;
  border: none;
  margin: 1rem auto;
`;

export const Box = styled.div`
  width: 100%;
  color: #FFF;
  background-color: #0BBBEF;
`;
export const Container = styled.div`
  width: 100%;
  padding: 20px;
`;
export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 1rem auto;
  padding: 20px;
`;

export const Title = styled.p`
  text-align: center;
  margin: 1rem 0;
  font-size: 2rem;
  
`;
export const P = styled.p`
  margin: 0.225rem 0;
  font-size: 1rem;
`;
export default Empleados;