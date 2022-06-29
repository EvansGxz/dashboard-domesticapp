import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { Navegador } from '../components/Navegador'
import { Sidebar } from '../components/Sidebar'
import { useAuth } from '../context/auth-context'
import { deleteService, indexServices } from '../services/services-services'
import { Popdiv } from './pop'
import CrearTarea from './Tareas/createTarea'
import EditarTarea from './Tareas/edtTarea'

const Tareas = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cusId, setCusId] = useState(null);
  const [show, setShow] = useState(false);
  const [tasks, setTasks] = useState(null);
  const { user }= useAuth();
  useEffect(() => {
    indexServices().then(setTasks)
  }, [setTasks])

  function handleDelete(id){
    deleteService(id).then(() => {
      indexServices().then(setTasks)
     });
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

  function handleModalCreateChange(newValue) {
    setIsOpen(newValue)
  }

  function handleModalEditChange(newShow) {
    setShow(newShow)
    localStorage.removeItem('TaskID');
  }

  function handleEmployeesEditChange(newCustomer) {
    setTasks(newCustomer)
  }

  if(cusId){
    localStorage.setItem("TaskID", cusId);
  }
  return (
    <>
     {
      isOpen && <Popdiv
      content={<>
      <Box>
      <Title>CREAR TAREAS</Title></Box>
      <CrearTarea onInputChange={handleModalCreateChange} onStateChange={handleEmployeesEditChange}/>
      </>}
      handleClose={togglePopup}
    />
    }
    {
      show && <Popdiv
      content={<>
      <Box>
      <Title>EDITAR TAREAS</Title></Box>
      {
        cusId ? (<>
          <EditarTarea onStateChange={handleEmployeesEditChange} onInputChange={handleModalEditChange}/>
        </>) : null
      }
      
      </>}
      handleClose={toggleEdit}
    />
    }
      <Sidebar></Sidebar>
      <div className='ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]'>
        <Navegador titulo='Tareas'></Navegador>
        <div className='px-6 2xl:container'>
          <div className='grid gap-6'>
            <div className='max-w-2xl mx-auto bg-white p-8 lg:w-[100%]'>
              <div className=''>
                <div className=''>
                  <div className=''>
                                       
                    {user.role === 'spectator' ? null : (
                    <Button onClick={()=>togglePopup()}>Crear Tareas</Button>
                    )}</div>
                </div>
              </div>
            </div>
          </div>
        
          {/* tabla */}
          {
            tasks ? (
              <>
                <table className='table-auto table text-white border-separate space-y-6 text-sm w-full border-collapse'>
            <thead className='text-black'>
              <tr>
                <th className='p-3 text-left'>ID</th>
                <th className='p-3 text-left'>Tarea</th>
                <th className='p-3 text-left'>Servicio</th>
                <th className='p-3 text-left'>Acción</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((empleado, index) => {
                return (
                  <tr key={index} className='bg-gray-100'>
                    <td className='p-3 text-black'>{empleado.id}</td>
                    <td className='p-3 text-black'>{empleado.service_name}</td>
                    <td className='p-3 text-black'>{empleado.category_name}</td>
                    {user.role === 'spectator' ? null : (<>
                    <td className='p-3 flex flex-row'>
                      <div 
                      className='text-gray-600 hover:text-cyan-300'
                      onClick={()=>onEdit(empleado.id)}>
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
                      <div id={empleado.id} onClick={()=>handleDelete(empleado.id)}
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
                    </td></>)}
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

const Box = styled.div`
  width: 100%;
  color: #FFF;
  background-color: #0BBBEF;
`;

const Title = styled.p`
  text-align: center;
  margin: 1rem 0;
  font-size: 2rem;
  
`;

export default Tareas;