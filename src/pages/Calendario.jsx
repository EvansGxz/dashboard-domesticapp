import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { Navegador } from '../components/Navegador'
import { Sidebar } from '../components/Sidebar'
import { deleteOrder, indexOrder } from '../services/order-details-services'
import CrearOrder from './Order/createOrdr'
import { Popdiv } from './pop'
//Fullcalendar and Realted Plugins
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"; // needed
import listPlugin from '@fullcalendar/list'; //For List View
import { PopAll } from '../components/popAll'
import EditarOrder from './Order/editOrder'
import { useAuth } from '../context/auth-context'



export const Calendario = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [cusId, setCusId] = useState(null);
  const [show, setShow] = useState(true);
  const { user } =useAuth();
  const [createCalendar, setCreateCalendar] = useState(false);
  const [cal, setCal] = useState({});

 useEffect(() => {
    indexOrder().then(setCategories)
  }, [])
  const togglePopup = () => {
    setIsOpen(!isOpen);
    setShow(!show);
  }

  const togglePopCreate = () => {
    setCreateCalendar(!createCalendar);
    setShow(!show);
  }
  function toggleEdit(){
    setIsEdit(!isEdit);
    setShow(!show);
  }
  function onEdit(id){
    setCusId(id);
    setIsEdit(!isEdit);
  }
  function other(id){
    onEdit(id);
    setIsOpen(!isOpen);
  }
  function handleDelete(id){
    deleteOrder(id).then(() => {
      indexOrder().then(setCategories)
    });
 }
  const [categories, setCategories] = useState(null);
 
    let details= []
    if(categories){
      categories.forEach(category =>{
        details.push({title: category.address,
                      id: category.id,
                      date: category.start_date,
                      start_date: category.start_date,
                      workday: category.workday,
                      supply_food: category.supply_food,
                      service: category.category.category_name,
                      region: category.category.region,
                      employee: category.employee.full_name,
                      employee_direction: category.employee.region,
                      customer: category.customer.full_name
                    })
      })
      console.log(details)
    }
  
  return (
    <>
    {
      createCalendar && <PopAll
      content={<>
      <Box>
      <Title>CREAR SERVICIO</Title></Box>
      <CrearOrder/>
      </>}
      handleClose={togglePopCreate}
    />
    }
    {
      isEdit && <PopAll
      content={<>
      <Box>
      <Title>EDITAR SERVICIO</Title></Box>
      {
        cusId ? (<>
          <EditarOrder id={cusId}/>
        </>) : null
      }
      
      </>}
      handleClose={toggleEdit}
    />
    }
      <Sidebar></Sidebar>
      <div className='ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]'>
        <Navegador titulo='Servicios dados'></Navegador>
        <div className='px-6 2xl:container'>
          <div className='grid gap-6'>
            <div className='max-w-2xl mx-auto bg-white p-8 lg:w-[100%]'>
              <div className=''>
                <div className=''>
                  <div className='ml-60 flex justify-center gap-4'>
                    <h3 className='text-3xl font-bold text-gray-700'>Servicios</h3>                    
                    {user.role === 'spectator' ? null : (
                    <Button onClick={()=>togglePopCreate()}>Crear Servicio</Button>
                    )}</div>
                </div>
              </div>
            </div>
          </div>
        </div>      

        <>
     {
      isOpen && <Popdiv
      content={<>
      <Box>
      <Title>Detalles de servicio</Title></Box>
      <Container>
        <P><b>Dirección del servicio:</b> {cal.title}</P>
        <P><b>Cliente: </b>{cal._def.extendedProps.customer}</P>
        <P><b>Empleado: </b>{cal._def.extendedProps.employee}</P>
        <P><b>País: </b>{cal._def.extendedProps.region}</P>
        <P><b>Servicio: </b>{cal._def.extendedProps.service}</P>
        <P><b>Fecha del servicio: </b>{cal._def.extendedProps.start_date}</P>
        <P><b>Suplir alimentos: </b>{cal._def.extendedProps.supply_food}</P>
        <P><b>Tipo de jornada: </b>{cal._def.extendedProps.workday}</P>
        {user.role === 'spectator' ? null : (
        <ButtonContainer>
        <Button onClick={()=>other(cal._def.publicId)}>Editar Servicio</Button>
        <Button onClick={()=>handleDelete(cal._def.publicId)}>Cancelar Servicio</Button>
        </ButtonContainer>)}
        </Container>
      </>}
      handleClose={togglePopup}
    />
    }
    {
      categories ? (
        <>
        {
          show ? (
            <>
              <div className="maincontainer">
              <FullCalendar
                plugins={[ dayGridPlugin, interactionPlugin, listPlugin ]}
                initialView="dayGridMonth"
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,dayGridWeek,dayGridDay,listWeek'
                }}
                eventClick={
                  function(arg){
                    setCal(arg.event);
                    togglePopup()
                  }
                }
                events={details}
              />
        </div>
            </>
          ) : null
        }
        </>
      ) : null
    }
      
    </>
          </div>  
    </>
  )
}

export const ContainerAll = styled.div`
  flex-direction: column;
  width: 50vw;
  background-color: $fff;
  margin: 0 auto;
  border-radius: 30px;
  justify-content: space-between;
  align-content: center;
  height: 50vh;
  padding-left: 18rem;
  padding-top: 5rem;
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