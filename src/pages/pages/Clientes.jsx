import React from 'react'
import { BuscarClientes } from '../components/BuscarClientes'
import { Navegador } from '../components/Navegador'
import { Sidebar } from '../components/Sidebar'
import { clientes } from '../data/ClientesData'

export const Clientes = () => {
  return (
    <>
      <Sidebar></Sidebar>
      <div class='ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]'>
        <Navegador titulo='Clientes'></Navegador>
        <div class='px-6 pt-6 2xl:container'>
          <BuscarClientes></BuscarClientes>
          {/* tabla */}
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
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente, index) => {
                return (
                  <tr class='bg-gray-100'>
                    <td class='p-3'>
                      <div class='flex align-items-center'>
                        <div class='ml-3'>
                          <div class='text-black font-bold'>
                            {cliente.nombre}
                          </div>
                          <div class='text-black'>{cliente.pais}</div>
                        </div>
                      </div>
                    </td>
                    <td class='p-3 text-black'>{cliente.pais}</td>
                    <td class='p-3 text-black'>{cliente.region}</td>
                    <td class='p-3 text-black'>{cliente.tipoCliente}</td>
                    <td class='p-3'>
                      <div class='flex align-items-center'>
                        <div class='ml-3'>
                          <div class='text-black'>{cliente.documento}</div>
                          <div class='text-black'>{cliente.documento}</div>
                        </div>
                      </div>
                    </td>
                    <td class='p-3 text-black'>{cliente.celular}</td>
                    <td class='p-3 text-black'>{cliente.fechaNacimiento}</td>
                    <td class='p-3 text-black'>
                      <div class='align-items-center'>
                        <div class=''>
                          <div class='text-black'>
                            <form action='dClientes.html'>
                              <select
                                name='cars'
                                id='cars'
                                class='form-select appearance-none block w-full pl-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                              >
                                <option value='volvo'>Volvo</option>
                                <option value='saab'>Saab</option>
                                <option value='mercedes'>Mercedes</option>
                                <option value='audi'>Audi</option>
                              </select>
                              {/* <!-- <input type="submit" value="Submit"> --> */}
                            </form>
                          </div>
                        </div>
                      </div>
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
