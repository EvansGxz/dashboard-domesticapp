import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { Navegador } from '../components/Navegador'
import { Sidebar } from '../components/Sidebar'
import { deleteCupon, indexCupon } from '../services/cupon-service'
import { NewLink } from './cupons'
import CreateCupon from './Cupons/createCupon'

 const Cupones = () => {
  const [cupons, setCupons] = useState(null);
  useEffect(()=>{
    indexCupon().then(setCupons)
  },[])
  function handleDelete(id){
    deleteCupon(id).then(() => {
      window.location.reload();
     });
  }
  return (
    <>
      <Sidebar></Sidebar>
      <div className='ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]'>
        <Navegador titulo='Cupones'></Navegador>
        <div className='px-6 pt-6 2xl:container'>
        <div className='grid gap-6'>
            <div className='max-w-2xl mx-auto bg-white p-8 lg:w-[100%]'>
              <div className=''>
                <div className=''>
                  <div className='ml-60 flex justify-center gap-4'>
                    <h3 className='text-3xl font-bold text-gray-700'>Cupones</h3>                    
                    <input type="checkbox" id="btn-modal"/>
      <div class="modal">
        <div class="contenedor">
          <header>Crear Cupón</header>
          <label className="contenedor_label" htmlFor="btn-modal">X</label>
          <div className="contenido">
            <ContainerAll>
              <CreateCupon/>
            </ContainerAll>
          </div>
        </div>
      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
          
          {
            cupons ? (
              <>
                {cupons.map((cupon) => {
              return (
                <div className='lg:h-full py-8 px-6 rounded-xl border border-gray-300 bg-white'>
                  <div className='mt-10'>
                    <h5 className='text-xl text-gray-700 text-center'>
                      Fecha limite: {cupon.end_date}
                    </h5>
                    <div className='mt-2 flex justify-center gap-4'>
                      <h3 className='text-2xl font-bold text-gray-700'>
                        {cupon.name}
                      </h3>
                    </div>
                    
              <div className='mt-2 flex justify-center gap-4'>
                    <NewLink to={`/cupones/modify_cupon/?id=${cupon.id}`}>
                      <button className='block text-xs text-center text-gray-500 hover:text-cyan-400'>
                        MODIFICAR
                      </button>
                    </NewLink>
                      <br />
                      <button onClick={()=>handleDelete(cupon.id)} className='block text-xs text-center text-gray-500 hover:text-cyan-400'>
                        ELIMINAR
                      </button>
                      <br />
                      <button className='block text-center text-xs text-gray-500 hover:text-cyan-400'>
                        NOTIFICAR
                      </button>
                    </div>          
                  </div>
                </div>
              )
            })}
              </>
            ) : null
          }
          <div>
          <label htmlFor="btn-modal">
              <div className='lg:h-full py-11 px-6 text-gray-600 rounded-xl border border-gray-200 bg-gradient-to-r from-sky-600 to-cyan-400  hover:text-white'>
                <div className='mt-6 mt-2 flex justify-center gap-4'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-14 w-14'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth='2'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M12 4v16m8-8H4'
                    />
                  </svg>
                </div>
              </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
const ContainerAll = styled.div`
  padding-left: 20rem;
`;
export default Cupones;