import React, { useEffect, useState } from 'react';
//Fullcalendar and Realted Plugins
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"; // needed
import listPlugin from '@fullcalendar/list'; //For List View
import { deleteOrder, indexOrder } from '../services/order-details-services';
import { Popdiv } from './pop';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';



export default function Cal() {
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [cal, setCal] = useState({});
  const navigate = useNavigate();
 useEffect(() => {
    indexOrder().then(setCategories)
  }, [])
  const togglePopup = () => {
    setIsOpen(!isOpen);
    setShow(!show);
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
        <ButtonContainer>
        <Button onClick={()=>navigate(`/calendar/edit/?id=${cal._def.publicId}`)}>Editar Servicio</Button>
        <Button onClick={()=>handleDelete(cal._def.publicId)}>Cancelar Servicio</Button>
        </ButtonContainer>
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
)
};

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