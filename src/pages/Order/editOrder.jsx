import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import TimePicker from "react-time-picker";
import { indexAdmin } from "../../services/admin-services";
import { indexCategories } from "../../services/categories-services";
import { indexCustomer } from "../../services/customer-services";
import { indexEmployee } from "../../services/employee-service";
import { createNotify } from "../../services/notiications-services";
import { indexOrder, showOrderDetail, updateOrder } from "../../services/order-details-services";
import { EditServiceNotify } from "../../services/twilio-services";
import { Input, Selected, Timer } from "../../styles/views/Login";



const StyledForm = styled.form`
  display: flex;
  flex-direction: initial;
  gap: 2rem;
  min-width: 258px;
`;

const Container = styled.div`
  margin: 2% 5%;
  justify-content: space-between;
  align-content: center;
  float: inline-start;
  {window.screen.width < 810 ? (width: 100%):(width: 30%)}
`;

export default function EditarOrder({onStateChange, onInputChange}) {
  const [form, setForm] = useState(null);
  const id = localStorage.getItem("OrderID");

  const [categories, setCategories] = useState(null);
  const [employess, setEmployees] = useState(null);
  const [customer, setCustomers] = useState(null);
  const [admins, setAdmins] = useState(null);
  const [order, setOrder] = useState(null);
  const [isDate, setisDate] = useState(null);

  const [isTime, setIsTime] = useState();
  useEffect(() =>{
    indexCategories().then(setCategories)
    indexEmployee().then(setEmployees)
    indexCustomer().then(setCustomers)
    
    indexOrder().then(setOrder);
    indexAdmin().then(setAdmins)
    showOrderDetail(id).then((category) =>{
      category.forEach((m)=>{
        setisDate(m.start_date)
        setForm({
        category: m.category.id,
        employee: m.employee.id,
        customer: m.customer.id,
        category_name: m.category.category_name,
        employee_name: m.employee.full_name,
        customer_name: m.customer.full_name,
        address: m.address,
        start_date: m.start_date,
        workday: m.workday,
        discount: m.discount,
        supply_food: m.supply_food,
        service_time: m.service_time,
        hours: m.hours,
      })
    })
      
    })
  }, [id])

  function handleSubmit(event) {
    event.preventDefault();
    updateOrder({category_id: form.category_id, employee_id: form.employee_id, customer_id: form.customer_id,
      address: form.address, start_date: event.target.start_date.value, workday: event.target.workday.value, discount: form.discount,
     supply_food: form.supply_food, service_time: isTime}, id)
    .then((cat) => {
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
      createNotify({name: "Servicio Reprogramado", body: `para el día ${cat.start_date}`, user_id: admin.admin.user_id})
      
    EditServiceNotify({phone: admin.admin.phone,
                      lada: admin.admin.lada,
                    	service: cat.category.category_name,
                      day: event.target.address.value,
                      service_time: cat.service_time, 
                      finish_hour: lastTime,
                      customer: cat.customer.full_name,
                      address: event.target.address.value,
                      employee: cat.employee.full_name})
    })
      
      onInputChange(false);
      indexOrder().then(onStateChange)
     
    })
  }

  function handleFormChange(event) {
   
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  if(form){
  if (order && form.start_date && employess) {
    
    order.forEach((o) => {
      if (o.start_date === form.start_date && o.employee.id === form.employee) {
        employess.forEach((employee) => {
          if(employee.employee.id === form.employee)
            
            if(isDate !== form.start_date){
              alert("Este empleado ya tiene este dia ocupado");
              setForm({...form, start_date: isDate})
            }
            
        })
      }
    })
  }}

  return (
    <>
    {form ? (
      <>
      <StyledForm onSubmit={e=>handleSubmit(e)}>
      {window.screen.width < 810 ? (
        <>
        <Container>
        <Selected id="category_id" label="Servicios" name="category_id" onChange={handleFormChange}>
          <option value="">{form.category_name}</option>
          {categories ? (
            categories.map((category) => (
              <>
              <option value={category.id}>{category.category_name}</option></>
            ))) : null}
        </Selected>

        <Selected id="employee_id" label="Empleados" name="employee_id" onChange={handleFormChange}>
          <option value="">{form.employee_name}</option>
          {employess ? (
            employess.map((category) => (
              <>
              <option value={category.employee.id}>{category.employee.full_name}</option></>
            ))) : null}
        </Selected>

        <Selected id="customer_id" label="Clientes" name="customer_id" onChange={handleFormChange}>
          <option value="">{form.customer_name}</option>
          {customer ? (
            customer.map((category) => (
              <>
              <option value={category.customer.id}>{category.customer.full_name}</option></>
            ))) : null}
        </Selected>
        <Input
        id="address"
        label="Dirección"
        type="text"
        placeholder="1"
        value={form.address}
        onChange={handleFormChange}
      />
     
      
      <Input
        id="start_date"
        label="Fecha de inicio"
        type="date"
        placeholder="03-04-2022"
        value={form.start_date}
        onChange={handleFormChange}
      />
            <TimePicker
       onChange={setIsTime} value={form.service_time} />
      <Selected id="workday" label="Tipo de jornada" name="workday" onChange={handleFormChange}>
          <option value="">{form.workday}</option>
          <option value="Completa">Completa | COL</option>
          <option value="Media">Media | COL</option>
          <option value="Hora">Hora | EU</option>
      </Selected>
       <Input
        id="discount"
        label="Descuento"
        type="number"
        placeholder="10"
        value={form.discount}
        onChange={handleFormChange}
      />
       <Selected id="supply_food" label="Suministrar Alimentos" name="supply_food" onChange={handleFormChange}>
          <option value="">{form.supply_food}</option>
          <option value="Si">Si</option>
          <option value="No">No</option>
        </Selected>
        
      <button class='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl w-full md:w-auto px-5 py-2.5 text-center' type="submit">
        Actualizar Servicio
      </button>
      </Container>
        </>
      ):(
        <>
        <Container>
        <Selected id="category_id" label="Servicios" name="category_id" onChange={handleFormChange}>
          <option value="">{form.category_name}</option>
          {categories ? (
            categories.map((category) => (
              <>
              <option value={category.id}>{category.category_name}</option></>
            ))) : null}
        </Selected>

        <Selected id="employee_id" label="Empleados" name="employee_id" onChange={handleFormChange}>
          <option value={form.employee}>{form.employee_name}</option>
          {employess ? (
            employess.map((category) => (
              <>
              <option value={category.employee.id}>{category.employee.full_name}</option></>
            ))) : null}
        </Selected>

        <Selected id="customer_id" label="Clientes" name="customer_id" onChange={handleFormChange}>
          <option value="">{form.customer_name}</option>
          {customer ? (
            customer.map((category) => (
              <>
              <option value={category.customer.id}>{category.customer.full_name}</option></>
            ))) : null}
        </Selected>
        <Input
        id="address"
        label="Dirección"
        type="text"
        placeholder="1"
        value={form.address}
        onChange={handleFormChange}
      />
      {
        form.workday === "Hora" ? (
          <>
                <Input
                id="hours"
                label="Cantidad de Horas"
                type="number"
                placeholder="3"
                value={form.hours}
                onChange={handleFormChange}
              />
                </>
        ) : null
      }
      </Container>
      <Container>
      
      <Input
        id="start_date"
        label="Fecha de inicio"
        type="date"
        placeholder="03-04-2022"
        value={form.start_date}
        onChange={handleFormChange}
      />
            <Timer label="Hora"
       onChange={setIsTime} value={form.service_time} />
      <Selected id="workday" label="Tipo de jornada" name="workday" onChange={handleFormChange}>
          <option value={form.workday}>{form.workday}</option>
          <option value="Completa">Completa | COL</option>
          <option value="Media">Media | COL</option>
          <option value="Hora">Hora | EU</option>
      </Selected>
       <Input
        id="discount"
        label="Descento"
        type="number"
        placeholder="10"
        value={form.discount}
        onChange={handleFormChange}
      />
       <Selected id="supply_food" label="Suministrar Alimentos" name="supply_food" onChange={handleFormChange}>
          <option value="">{form.supply_food}</option>
          <option value="Si">Si</option>
          <option value="No">No</option>
        </Selected>
        
      <button class='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl w-full md:w-auto px-5 py-2.5 text-center' type="submit">
        Actualizar Servicio
      </button>
      </Container>
        </>
      )}
      
    </StyledForm>
    </>
    ) : (<div>Cargando....</div>)}
    
    </>
  );
}

export const StyleSelect = styled.select`
  width: 80%;
  border: 1px solid #787b82;
  padding: 1.225rem 2rem;
  background-color: transparent;
  border-radius: 0.5rem;
  color: black;
  margin: 1rem 0;
`;