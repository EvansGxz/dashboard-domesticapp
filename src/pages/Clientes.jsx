import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Modal } from '../components/ModalMobile'
import { Navegador } from '../components/Navegador'
import { PopAll } from '../components/popAll'
import { Sidebar } from '../components/Sidebar'
import { useAuth } from '../context/auth-context'
import { indexCustomer } from '../services/customer-services'
import { deleteUser } from '../services/users-service'
import CrearCliente from "./Clientes/createCliente"
import EditarCliente from './Clientes/editCliente'
import { ContainerTable } from './Empleados'
import { Popdiv } from './pop'

const Clientes = () => {
  const {user}= useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [cusId, setCusId] = useState(null);
  const [mErrors, setMErrors] = useState(false);
  const [show, setShow] = useState(false);
  const [customers, setCustomers] = useState(null);
  useEffect(() => {
    indexCustomer().then(setCustomers)
  }, [setCustomers])

  function handleDelete(id){
     deleteUser(id).then(() => {
      indexCustomer().then(setCustomers)
     }).catch(toggleErrors);
  }

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  function toggleEdit(id){
    setShow(!show);
  }
  function toggleErrors() {
    setMErrors(!mErrors);
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
    localStorage.removeItem('CID');
  }

  function handleEmployeesEditChange(newCustomer) {
    setCustomers(newCustomer)
  }

  if(cusId){
    localStorage.setItem("CID", cusId);
  }

  return (
    <>
    {
      isOpen && (
        window.screen.width < 810 ? (<Modal
      content={<>
      <Box>
      <Title>CREAR CLIENTE</Title></Box>
      <CrearCliente onInputChange={handleModalCreateChange} onStateChange={handleEmployeesEditChange}/>
      </>}
      handleClose={togglePopup}
    />):(<PopAll
      content={<>
      <Box>
      <Title>CREAR CLIENTE</Title></Box>
      <CrearCliente onInputChange={handleModalCreateChange} onStateChange={handleEmployeesEditChange}/>
      </>}
      handleClose={togglePopup}
    />)
        
    )}
    {
      show && (
        window.screen.width < 810 ? (
          <Modal
      content={<>
      <Box>
      <Title>EDITAR CLIENTE</Title></Box>
      {
        cusId ? (<>
          <EditarCliente onStateChange={handleEmployeesEditChange} onInputChange={handleModalEditChange}/>
        </>) : null
      }
      
      </>}
      handleClose={toggleEdit}
    />
        ):(
          <PopAll
      content={<>
      <Box>
      <Title>EDITAR CLIENTE</Title></Box>
      {
        cusId ? (<>
          <EditarCliente onStateChange={handleEmployeesEditChange} onInputChange={handleModalEditChange}/>
        </>) : null
      }
      
      </>}
      handleClose={toggleEdit}
    />
        )
       
    )}
    {mErrors && (
        <Popdiv
          content={
            <>
              <BoxErr>
                <Title>No se puede ejecutar esta acción</Title>
              </BoxErr>
              <Container>
                <P>
                  Posibles motivos:
                  <UL>
                    <li>Este empleado está brindando un servicio.</li>
                  </UL>
                </P>
                <br />
                <P>
                  Acciones:
                  <UL>
                    <li>Finalizar servicio en curso.</li>
                    <li>Modificar <b>cliente</b> del servicio en curso.</li>
                  </UL>
                </P>
              </Container>
            </>
          }
          handleClose={toggleErrors}
        />
      )}
      <Sidebar></Sidebar>
      <div className='ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]'>
        <Navegador titulo='Clientes'></Navegador>
        <div className='px-6 2xl:container'>
          <div className='grid gap-6'>
            <div className='max-w-2xl mx-auto bg-white p-8 lg:w-[100%]'>
              <div className=''>
                <div className=''>
                  <div className=''>
                                     
                    <Button onClick={()=>togglePopup()}>Crear Cliente</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
          {/* tabla */}
          {
            customers ? (
              <ContainerTable>
              <table className='table-auto table text-white border-separate space-y-6 text-sm w-full border-collapse'>
            <thead className='text-black'>
              <tr>
                <th className='p-3 text-left'>Imagen</th>
                <th className='p-3 text-left'>Cliente</th>
                <th className='p-3 text-left'>Pais</th>
                <th className='p-3 text-left'>Region</th>
                <th className='p-3 text-left'>Tipo De Cliente</th>
                <th className='p-3 text-left'>Documento</th>
                <th className='p-3 text-left'>Celular</th>
                <th className='p-3 text-left'>Fecha de Nacimiento</th>
                <th className='p-3 text-left'>Encargado</th>
                <th className='p-3 text-left'>Acción</th>
              </tr>
            </thead>
            <tbody>
                {customers.map((cliente, index) => {
                return (
                  <tr key={index} className='bg-gray-100'>
                  <td className='p-3 text-black'><img
                        src={cliente.customer.image_url}
                        alt='category'
                        className='h-14 w-14 rounded-full'
                      /></td>
                    <td className='p-3'>
                      <div className='flex align-items-center'>
                        <div className='ml-3'>
                          <div className='text-black font-bold'>
                            {cliente.customer.full_name}
                          </div>
                      
                        </div>
                      </div>
                    </td>
                    <td className='p-3 text-black'>{cliente.customer.country}</td>
                    <td className='p-3 text-black'>{cliente.customer.region}</td>
                    <td className='p-3 text-black'>{cliente.customer.client_type}</td>
                    <td className='p-3'>
                      <div className='flex align-items-center'>
                        <div className='ml-3'>
                          <div className='text-black'>{cliente.customer.document_type}</div>
                          <div className='text-black'>{cliente.customer.document_id}</div>
                        </div>
                      </div>
                    </td>
                    <td className='p-3 text-black'>{cliente.customer.phone}</td>
                    <td className='p-3 text-black'>{cliente.customer.birth_date}</td>
                    {cliente.customer.encargado ? (
                      <td className='p-3 text-black'>{cliente.customer.encargado}</td>
                    ) : (<td className='p-3 text-black'>Nadie</td>)}
                    {user.role === 'spectator' ? null : (
                    <>
                    <td className='p-3 flex flex-row'>
                    <div id={cliente.customer.user_id} onClick={()=>onEdit(cliente.customer.user_id)}
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
                      <div id={cliente.customer.user_id} onClick={()=>handleDelete(cliente.customer.user_id)}
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
                            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                          />
                        </svg>
                        
                      </div>
                      <Link 
                      className='text-gray-600 hover:text-cyan-300'
                      to={`/clientes/calendar?id=${cliente.customer.id}`}>
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
                      </>
                    )}
                    
                  </tr>
                )
              })}
              </tbody>
          </table>
              </ContainerTable>
            ) : (
              <h2>No se encontraron Clientes</h2>
            )
          }   
        </div>
      </div>
    </>
  )
}

export const ContainerAll = styled.div`

  padding-left: 1.225rem;
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
const UL = styled.ul`
  list-style: inherit;
  padding: 0 2rem;
`;
const BoxErr = styled.div`
  width: 100%;
  color: #fff;
  background-color: #ec607e;
`;
export default Clientes;
