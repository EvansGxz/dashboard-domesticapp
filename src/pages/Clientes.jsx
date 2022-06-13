import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BuscarClientes } from '../components/BuscarClientes'
import { Navegador } from '../components/Navegador'
import { Sidebar } from '../components/Sidebar'
import { useAuth } from '../context/auth-context'
import { indexCustomer } from '../services/customer-services'
import { deleteUser } from '../services/users-service'

const Clientes = () => {
  const {user}= useAuth();
  const [customers, setCustomers] = useState(null);
  useEffect(() => {
    indexCustomer().then(setCustomers)
  }, [setCustomers])

  function handleDelete(id){
     deleteUser(id).then(() => {
      window.location.reload();
     });
  }
  return (
    <>
      <Sidebar></Sidebar>
      <div class='ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]'>
        <Navegador titulo='Clientes'></Navegador>
        <div class='px-6 pt-6 2xl:container'>
          <BuscarClientes></BuscarClientes>
          
          {/* tabla */}
          {
            customers ? (
              <>
              <table class='table-auto table text-white border-separate space-y-6 text-sm w-full border-collapse'>
            <thead class='text-black'>
              <tr>
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
                    {user.role === 'admin' ? (
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
                          stroke-width='2'
                        >
                          <path
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                          />
                        </svg>
                      </Link>
                      <div id={cliente.customer.user_id} onClick={()=>handleDelete(cliente.customer.user_id)}
                        className='text-gray-600 hover:text-cyan-300 ml-4'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-6 w-6'
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
                      </div>
                    </td>
                      </>
                    ) : null}
                    
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

export default Clientes;
