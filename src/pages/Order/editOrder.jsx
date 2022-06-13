import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showOrderDetail, updateOrder } from "../../services/order-details-services";
import { Input } from "../../styles/views/Login";


const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-width: 258px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 480px;
  background-color: $fff;
  margin: 0 auto;
  border-radius: 30px;
  justify-content: space-between;
  align-content: center;
  height: 100vh;
`;

export default function EditarOrder() {
  const [form, setForm] = useState(null);
 const id = new URLSearchParams(window.location.search).get("id");
 const navigate = useNavigate();
  useEffect(() =>{
   
    showOrderDetail(id).then((category) =>{
      category.map((m)=>(
        setForm({
        category: m.category.id,
        employee: m.employee.id,
        customer: m.customer.id,
        address: m.address,
        start_date: m.start_date,
        workday: m.workday,
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
    <Container>
    {form ? (
      <StyledForm onSubmit={handleSubmit}>
      <Input
        id="category_id"
        label="ID de servicio"
        type="number"
        placeholder="1"
        value={form.category}
        onChange={handleFormChange}
      />
      <Input
        id="employee_id"
        label="ID de empelado"
        type="number"
        placeholder="1"
        value={form.employee}
        onChange={handleFormChange}
      />
      <Input
        id="customer_id"
        label="ID de cliente"
        type="number"
        placeholder="1"
        value={form.customer}
        onChange={handleFormChange}
      />
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
        Actualizar
      </button>
    </StyledForm>) : (<div>Cargando....</div>)}
    </Container>
  );
}
