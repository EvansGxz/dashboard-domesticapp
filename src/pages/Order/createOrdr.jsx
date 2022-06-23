import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { indexCategories } from "../../services/categories-services";
import { indexEmployee } from "../../services/employee-service";
import { indexCustomer } from "../../services/customer-services";
import { createOrder, indexOrder } from "../../services/order-details-services";
import { Input, Selected } from "../../styles/views/Login";


const StyledForm = styled.form`
  flex-direction: column;
  gap: 2rem;
  min-width: 258px;
`;

const Container = styled.div`
  margin: 2% 5%;
  justify-content: space-between;
  align-content: center;
  float: inline-start;
  width: 30%;
`;

export default function CrearOrder({onInputChange, onStateChange}) {
  const [categories, setCategories] = useState(null);
  const [employess, setEmployees] = useState(null);
  const [customer, setCustomers] = useState(null);
  const [form, setForm] = useState({
    category_id: "",
    employee_id: "",
    customer_id: "",
    address: "",
    start_date: "",
    workday: "",
    discount: "",
    supply_food: "",
  });

  useEffect(() => {
  indexCategories().then(setCategories)
  indexEmployee().then(setEmployees)
  indexCustomer().then(setCustomers)
  }, [])

  function handleSubmit(event) {
    event.preventDefault();
    createOrder({category_id: form.category_id, employee_id: form.employee_id, customer_id: form.customer_id,
                 address: form.address, start_date: event.target.start_date.value, workday: event.target.workday.value, discount: form.discount,
                supply_food: form.supply_food}).then(()=>{
                  onInputChange(false)
                  indexOrder().then(onStateChange)
                })
  }

  function handleFormChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  return (
    <>
    {form ? (
      <>
      <StyledForm onSubmit={e=>handleSubmit(e)}>
      <Container>
        <Selected id="category_id" label="Servicios" name="category_id" onChange={handleFormChange}>
          <option value="">--selecciona servicio--</option>
          {categories ? (
            categories.map((category) => (
              <>
              <option value={category.id}>{category.category_name}</option></>
            ))) : null}
        </Selected>

        <Selected id="employee_id" label="Empleados" name="employee_id" onChange={handleFormChange}>
          <option value="">--selecciona empleado--</option>
          {employess ? (
            employess.map((category) => (
              <>
              <option value={category.employee.id}>{category.employee.full_name}</option></>
            ))) : null}
        </Selected>

        <Selected id="customer_id" label="Clientes" name="customer_id" onChange={handleFormChange}>
          <option value="">--selecciona cliente--</option>
          {customer ? (
            customer.map((category) => (
              <>
              <option value={category.customer.id}>{category.customer.full_name}</option></>
            ))) : null}
        </Selected>
        <Input
        id="address"
        label="Dircción"
        type="text"
        placeholder="1"
        value={form.address}
        onChange={handleFormChange}
      />
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
      <Selected id="workday" label="Tipo de jornada" name="workday" onChange={handleFormChange}>
          <option value="">--tipo de jornada--</option>
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
          <option value="">--suministrar alimento--</option>
          <option value="Si">Si</option>
          <option value="No">No</option>
        </Selected>
        
      <button class='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl w-full md:w-auto px-5 py-2.5 text-center' type="submit">
        Crear Servicio
      </button>
      </Container>
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