import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { Navegador } from "../components/Navegador";
import { Sidebar } from "../components/Sidebar";
import { deleteOrder, indexOrder } from "../services/order-details-services";
import CrearOrder from "./Order/createOrdr";
import { Popdiv } from "./pop";
//Fullcalendar and Realted Plugins
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed
import listPlugin from "@fullcalendar/list"; //For List View
import { PopAll } from "../components/popAll";
import EditarOrder from "./Order/editOrder";
import { useAuth } from "../context/auth-context";
import date from 'date-and-time';
import { Modal } from "../components/ModalMobile";
import { createNotify } from "../services/notiications-services";
import { indexAdmin } from "../services/admin-services";
import { DeleteServiceNotify } from "../services/twilio-services";

export const Calendario = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [cusId, setCusId] = useState(null);
  const [show, setShow] = useState(true);
  const [admins, setAdmins] = useState(null);
  const { user } = useAuth();
  const [createCalendar, setCreateCalendar] = useState(false);
  const [cal, setCal] = useState({});

  useEffect(() => {
    indexOrder().then(setCategories);
    indexAdmin().then(setAdmins)
  }, []);
  const togglePopup = () => {
    setIsOpen(!isOpen);
    setShow(!show);
  };

  const togglePopCreate = () => {
    setCreateCalendar(!createCalendar);
    setShow(!show);
  };
  function toggleEdit() {
    setIsEdit(!isEdit);
    setShow(!show);
  }
  function onEdit(id) {
    setCusId(id);
    setIsEdit(!isEdit);
  }
  function other(id) {
    onEdit(id);
    setIsOpen(!isOpen);
  }
  function handleDelete(id) {
    setIsOpen(!isOpen);
    setShow(!show);
    deleteOrder(id).then((cat) => {
      indexOrder().then(setCategories);
      togglePopup();
      let lastTime
      if(cat.workday === "Hora"){
        const time = (parseInt(cat.service_time.split(":")[0])+parseInt(cat.hours));
        lastTime = time+":"+cat.service_time.split(":")[1];
      }
      if(cat.workday === "Media"){
        let time = (parseInt(cat.service_time.split(":")[0])+4)+":"+parseInt(cat.service_time.split(":")[1]);
        lastTime = (parseInt(time.split(":")[0]))+":"+parseInt(time.split(":")[1]+30);
       }
       if(cat.workday === "Completa"){
        let time = (parseInt(cat.service_time.split(":")[0])+9)+":"+parseInt(cat.service_time.split(":")[1]);
        lastTime = time.split(":")[0]+":"+cat.service_time.split(":")[1];
       }
      admins.forEach((admin) =>{
        createNotify({name: "Servicio Cancelado", body: `servicio del día ${cat.start_date}. Servicio de ${cat.category.category_name}`, user_id: admin.admin.user_id})
        DeleteServiceNotify({phone: admin.admin.phone,
          lada: admin.admin.lada,
          service: cat.category.category_name,
          day: cat.start_date,
          service_time: cat.service_time, 
          finish_hour: lastTime,
          customer: cat.customer.full_name,
          address: cat.address,
          employee: cat.employee.full_name})
      })
    });

  }
  const [categories, setCategories] = useState(null);

  let details = [];  
  if (categories) {
    categories.forEach((category) => {
      const calc = category.start_date.split('-').join('/');
      const now = new Date(calc);
      now.setDate(now.getDate());
      if(category.service_time){
        let time = category.service_time.split(":");
        now.setHours(time[0])
        now.setMinutes(time[1])
      }
      date.format(now, 'YYYY-MM-DD HH:mm');
      details.push({
        title: category.address,
        id: category.id,
        date: now,
        start_date: category.start_date,
        workday: category.workday,
        supply_food: category.supply_food,
        service: category.category.category_name,
        region: category.category.region,
        employee: category.employee.full_name,
        employee_direction: category.employee.region,
        customer: category.customer.full_name,
        service_time: category.service_time,
        hours: category.hours
      });
    });
  }
  function handleModalCreateChange(newValue) {
    setCreateCalendar(newValue);
    setShow(true);
  }

  function handleModalEditChange(newShow) {
    setIsEdit(newShow);
    setIsOpen(newShow);
    setShow(true);
    localStorage.setItem("OrderID", cusId);
  }

  function handleEmployeesEditChange(newCustomer) {
    setCategories(newCustomer);
  }

  if (cusId) {
    localStorage.setItem("OrderID", cusId);
  }
  return (
    <>
      {createCalendar && (
        window.screen.width < 810 ? (
          <Modal
          content={
            <>
              <Box>
                <Title>CREAR SERVICIO</Title>
              </Box>
              <CrearOrder
                onInputChange={handleModalCreateChange}
                onStateChange={handleEmployeesEditChange}
              />
            </>
          }
          handleClose={togglePopCreate}
        />
        ):(
          <PopAll
          content={
            <>
              <Box>
                <Title>CREAR SERVICIO</Title>
              </Box>
              <CrearOrder
                onInputChange={handleModalCreateChange}
                onStateChange={handleEmployeesEditChange}
              />
            </>
          }
          handleClose={togglePopCreate}
        />
        )
       
      )}
      {isEdit && (
        window.screen.width < 810 ? (
          <Modal
          content={
            <>
              <Box>
                <Title>EDITAR SERVICIO</Title>
              </Box>
              {cusId ? (
                <>
                  <EditarOrder
                    onStateChange={handleEmployeesEditChange}
                    onInputChange={handleModalEditChange}
                  />
                </>
              ) : null}
            </>
          }
          handleClose={toggleEdit}
        />
        ):(
          <PopAll
          content={
            <>
              <Box>
                <Title>EDITAR SERVICIO</Title>
              </Box>
              {cusId ? (
                <>
                  <EditarOrder
                    onStateChange={handleEmployeesEditChange}
                    onInputChange={handleModalEditChange}
                  />
                </>
              ) : null}
            </>
          }
          handleClose={toggleEdit}
        />
        )
        
      )}
      <Sidebar></Sidebar>
      <div className='ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]'>
        <Navegador titulo="Servicios dados"></Navegador>
        <div className='px-6 2xl:container'>
          <div className='grid gap-6'>
            <div className='max-w-2xl mx-auto bg-white p-8 lg:w-[100%]'>
                    {user.role === "spectator" ? null : (
                      <Button onClick={() => togglePopCreate()}>
                        Crear Servicio
                      </Button>
                    )}
        </div>
</div></div>
        <>
          {isOpen && (
            window.screen.width < 810 ? (<Modal
              content={
                <>
                  <Box>
                    <Title>Detalles de servicio</Title>
                  </Box>
                  <Container>
                    <P>
                      <b>Dirección del servicio:</b> {cal.title}
                    </P>
                    <P>
                      <b>Cliente: </b>
                      {cal._def.extendedProps.customer}
                    </P>
                    <P>
                      <b>Empleado: </b>
                      {cal._def.extendedProps.employee}
                    </P>
                    <P>
                      <b>País: </b>
                      {cal._def.extendedProps.region}
                    </P>
                    <P>
                      <b>Servicio: </b>
                      {cal._def.extendedProps.service}
                    </P>
                    <P>
                      <b>Fecha del servicio: </b>
                      {cal._def.extendedProps.start_date}
                    </P>
                    <P>
                      <b>Hora: </b>
                      {cal._def.extendedProps.service_time}
                    </P>
                    <P>
                      <b>Suplir alimentos: </b>
                      {cal._def.extendedProps.supply_food}
                    </P>
                    <P>
                      <b>Tipo de jornada: </b>
                      {cal._def.extendedProps.workday}
                    </P>
                    
                      {cal._def.extendedProps.workday === "Hora" ? (
                      <>
                      <P>
                      <b>Horas: </b>
                      {cal._def.extendedProps.hours}
                      </P></>
                      ) : null}
                  
                    {user.role === "spectator" ? null : (
                      <ButtonContainer>
                        <Button onClick={() => other(cal._def.publicId)}>
                          Editar Servicio
                        </Button>
                        <Button onClick={() => handleDelete(cal._def.publicId)}>
                          Cancelar Servicio
                        </Button>
                      </ButtonContainer>
                    )}
                  </Container>
                </>
              }
              handleClose={togglePopup}
            />):(<Popdiv
              content={
                <>
                  <Box>
                    <Title>Detalles de servicio</Title>
                  </Box>
                  <Container>
                    <P>
                      <b>Dirección del servicio:</b> {cal.title}
                    </P>
                    <P>
                      <b>Cliente: </b>
                      {cal._def.extendedProps.customer}
                    </P>
                    <P>
                      <b>Empleado: </b>
                      {cal._def.extendedProps.employee}
                    </P>
                    <P>
                      <b>País: </b>
                      {cal._def.extendedProps.region}
                    </P>
                    <P>
                      <b>Servicio: </b>
                      {cal._def.extendedProps.service}
                    </P>
                    <P>
                      <b>Fecha del servicio: </b>
                      {cal._def.extendedProps.start_date}
                    </P>
                    <P>
                      <b>Hora: </b>
                      {cal._def.extendedProps.service_time}
                    </P>
                    <P>
                      <b>Suplir alimentos: </b>
                      {cal._def.extendedProps.supply_food}
                    </P>
                    <P>
                      <b>Tipo de jornada: </b>
                      {cal._def.extendedProps.workday}
                    </P>
                    {cal._def.extendedProps.workday === "Hora" ? (
                      <>
                      <P>
                      <b>Horas: </b>
                      {cal._def.extendedProps.hours}
                      </P></>
                      ) : null}
                    {user.role === "spectator" ? null : (
                      <ButtonContainer>
                        <Button onClick={() => other(cal._def.publicId)}>
                          Editar Servicio
                        </Button>
                        <Button onClick={() => handleDelete(cal._def.publicId)}>
                          Cancelar Servicio
                        </Button>
                      </ButtonContainer>
                    )}
                  </Container>
                </>
              }
              handleClose={togglePopup}
            />)
            
          )}
          {categories ? (
            <>
              {show ? (
                <CalendarContainer>
                  
                    <FullCalendar
                      plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
                      initialView="dayGridMonth"
                      headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,dayGridWeek,dayGridDay,listWeek",
                      }}
                      eventClick={function (arg) {
                        setCal(arg.event);
                        togglePopup();
                      }}
                      events={details}
                    />
                  
                </CalendarContainer>
              ) : null}
            </>
          ) : null}
        </>
      </div>
    </>
  );
};

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
  background-color: #0bbbef;
  border-radius: 10px;
  color: #fff;
  border: none;
  margin: 1rem auto;
`;

export const Box = styled.div`
  width: 100%;
  color: #fff;
  background-color: #0bbbef;
`;
export const Container = styled.div`
  width: 100%;
  padding: 20px;
`;
export const CalendarContainer = styled.div`
  
  
 
  
  {window.screen.width < 810 ? (
    width: 90vw;
    height: 100vh;
    ) : (
    width: 75vw;
    height: 90vh;
    overflow-x: scroll; 
    padding: 3rem;
  )
`;
export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 1rem auto;
  padding: 20px;
`;
