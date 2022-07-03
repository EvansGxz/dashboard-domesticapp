import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { Navegador } from '../components/Navegador'
import { Sidebar } from '../components/Sidebar'

import { indexOrder } from '../services/order-details-services'
import Grafic from './Grafica'

export const Estadisticas = () => {
  const [orders, setOrders] = useState(null)
  useEffect(() => {
    indexOrder().then(setOrders)
  }, [])
  if(orders){
    
    orders.forEach((order)=>{
      if(order.workday === "Completa"){

      }
    })
  }
  return (
    <>
      <Sidebar></Sidebar>
      <div class='ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]'>
        <Navegador titulo='Estadisticas'></Navegador>
        
            {window.screen.width < 810 ? (
              <ContainerAll>
              <Container>
              <Grafic/>
              </Container></ContainerAll>
            ):(
              
              <ContainerWeb>
              <Grafic/>
              </ContainerWeb>
            )}

      </div>
    </>
  )
}
export const Container = styled.div`
  width: 50rem;
{window.screen.width < 810 ? (
width: 50rem;
margin-top: 3rem;
overflow-x: scroll;
):(
height: 90vh;
width: 85vw;
margin-top: 3rem;
)}`;

export const ContainerWeb = styled.div`

height: 90vh;
width: 85vw;
margin-top: 3rem;
`;

export const ContainerAll = styled.div`
  width: 30rem;
  overflow-x: scroll;
`