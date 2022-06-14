import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../services/order-details-services";
import { Input } from "../../styles/views/Login";


const StyledForm = styled.form`
  flex-direction: column;
  gap: 2rem;
  min-width: 258px;
`;

const Container = styled.div`
  width: 300px;
  margin: 0 auto;
  justify-content: space-between;
  align-content: center;
  float: inline-start;
`;

export default function CrearOrder() {
  const [form, setForm] = useState({
    category_id: "",
    employee_id: "",
    customer_id: "",
    address: "",
    start_date: "",
    workday: "",
  });
 const id = new URLSearchParams(window.location.search).get("id");
 const navigate = useNavigate();


  function handleSubmit(event) {
    event.preventDefault();
    createOrder(form, id).then(()=>{
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
      <StyledForm onSubmit={handleSubmit}>
      <Container>
      <Input
        id="category_id"
        label="ID de servicio"
        type="number"
        placeholder="1"
        value={form.category_id}
        onChange={handleFormChange}
      />
      <Input
        id="employee_id"
        label="ID de empelado"
        type="number"
        placeholder="1"
        value={form.employee_id}
        onChange={handleFormChange}
      />
      <Input
        id="customer_id"
        label="ID de cliente"
        type="number"
        placeholder="1"
        value={form.customer_id}
        onChange={handleFormChange}
      />
      </Container>
      <Container>
      <Input
        id="address"
        label="Dircción"
        type="text"
        placeholder="1"
        value={form.address}
        onChange={handleFormChange}
      />
      <Input
        id="start_date"
        label="Fecha de inicio"
        type="text"
        placeholder="03-04-2022"
        value={form.start_date}
        onChange={handleFormChange}
      />
      <Input
        id="workday"
        label="Tipo de jornada"
        type="text"
        placeholder="1"
        value={form.workday}
        onChange={handleFormChange}
      />
      <button class='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center' type="submit">
        Crear
      </button>
      </Container>
    </StyledForm>
    </>
    ) : (<div>Cargando....</div>)}
    
    </>
  );
}
