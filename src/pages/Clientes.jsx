import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Navegador } from '../components/Navegador'
import { PopAll } from '../components/popAll'
import { Sidebar } from '../components/Sidebar'
import { useAuth } from '../context/auth-context'
import { indexCustomer } from '../services/customer-services'
import { deleteUser } from '../services/users-service'
import CrearCliente from "./Clientes/createCliente"

const Clientes = () => {
  const {user}= useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [customers, setCustomers] = useState(null);
  useEffect(() => {
    indexCustomer().then(setCustomers)
  }, [setCustomers])

  function handleDelete(id){
     deleteUser(id).then(() => {
      indexCustomer().then(setCustomers)
     });
  }

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const toggleEdit = () => {
    setShow(!show);
  }

  return (
    <>
    {
      isOpen && <PopAll
      content={<>
      <Box>
      <Title>CREAR CLIENTE</Title></Box>
      <CrearCliente/>
      </>}
      handleClose={togglePopup}
    />
    }
      <Sidebar></Sidebar>
      <div className='ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]'>
        <Navegador titulo='Clientes'></Navegador>
        <div className='px-6 2xl:container'>
          <div className='grid gap-6'>
            <div className='max-w-2xl mx-auto bg-white p-8 lg:w-[100%]'>
              <div className=''>
                <div className=''>
                  <div className='ml-60 flex justify-center gap-4'>
                    <h3 className='text-3xl font-bold text-gray-700'>Clientes</h3>                    
                    <input type="checkbox" id="btn-modal"/>
                    <Button onClick={()=>togglePopup()}>Crear</Button>
      <label htmlFor="btn-modal" className='ml-24 relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-sky-500 hover:bg-sky-700'>Crear Cliente</label>
      <div class="modal">
        <div class="contenedor">
          <header>Crear Cliente</header>
          <label className="contenedor_label" htmlFor="btn-modal">X</label>
          <div className="contenido">
            <ContainerAll>
            <CrearCliente/>
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
            customers ? (
              <>
              <table class='table-auto table text-white border-separate space-y-6 text-sm w-full border-collapse'>
            <thead class='text-black'>
              <tr>
                <th className='p-3 text-left'>Imagen</th>
                <th class='p-3 text-left'>Cliente</th>
                <th class='p-3 text-left'>Pais</th>
                <th class='p-3 text-left'>Region</th>
                <th class='p-3 text-left'>Tipo De Cliente</th>
                <th class='p-3 text-left'>Documento</th>
                <th class='p-3 text-left'>Celular</th>
                <th class='p-3 text-left'>Fecha de Nacimiento</th>
                <th class='p-3 text-left'>Encargado</th>
                <th className='p-3 text-left'>Acción</th>
              </tr>
            </thead>
            <tbody>
                {customers.map((cliente, index) => {
                return (
                  <tr key={index} class='bg-gray-100'>
                  <td className='p-3 text-black'><img
                        src={cliente.customer.image_url}
                        alt='category'
                        class='h-14 w-14 rounded-full'
                      /></td>
                    <td class='p-3'>
                      <div class='flex align-items-center'>
                        <div class='ml-3'>
                          <div class='text-black font-bold'>
                            {cliente.customer.full_name}
                          </div>
                      
                        </div>
                      </div>
                    </td>
                    <td class='p-3 text-black'>{cliente.customer.country}</td>
                    <td class='p-3 text-black'>{cliente.customer.region}</td>
                    <td class='p-3 text-black'>{cliente.customer.client_type}</td>
                    <td class='p-3'>
                      <div class='flex align-items-center'>
                        <div class='ml-3'>
                          <div class='text-black'>{cliente.customer.document_type}</div>
                          <div class='text-black'>{cliente.customer.document_id}</div>
                        </div>
                      </div>
                    </td>
                    <td class='p-3 text-black'>{cliente.customer.phone}</td>
                    <td class='p-3 text-black'>{cliente.customer.birth_date}</td>
                    {cliente.customer.encargado ? (
                      <td class='p-3 text-black'>{cliente.customer.encargado}</td>
                    ) : (<td class='p-3 text-black'>Nadie</td>)}
                    {user.role === 'spectator' ? null : (
                    <>
                    <td className='p-3 flex flex-row'>
                      <Link 
                      className='text-gray-600 hover:text-cyan-300'
                      to={`/clientes/edit?id=${cliente.customer.user_id}`}>
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
                            d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
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
              </>
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

export default Clientes;
