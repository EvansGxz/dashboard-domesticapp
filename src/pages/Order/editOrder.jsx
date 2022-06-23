import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { indexCategories } from "../../services/categories-services";
import { indexCustomer } from "../../services/customer-services";
import { indexEmployee } from "../../services/employee-service";
import { showOrderDetail, updateOrder } from "../../services/order-details-services";
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

export default function EditarOrder(ide) {
  const [form, setForm] = useState(null);
  const id = ide.id
  const navigate = useNavigate();
  const [categories, setCategories] = useState(null);
  const [employess, setEmployees] = useState(null);
  const [customer, setCustomers] = useState(null);
  useEffect(() =>{
    indexCategories().then(setCategories)
    indexEmployee().then(setEmployees)
    indexCustomer().then(setCustomers)
    showOrderDetail(id).then((category) =>{
      category.map((m)=>(
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
      })
      ))
      
    })
  }, [id])

  function handleSubmit(event) {
    event.preventDefault();
    updateOrder(form, id).then(()=>{
      navigate("/calendario")
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
        Actualizar Servicio
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