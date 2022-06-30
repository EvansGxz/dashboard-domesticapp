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
        <div class='px-6 pt-6 2xl:container'>
          <div class='grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12'>
            <Grafic/>
          </div>
        </div>
      </div>
    </>
  )
}
