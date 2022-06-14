import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../../services/categories-services";
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

export default function CrearServicio() {
  const [form, setForm] = useState({
    category_name: "",
    price: "",
    region: "",
  });

  const navigate = useNavigate();
  function handleSubmit(event) {
    event.preventDefault();
    createCategory(form).then(()=>{
      navigate("/gestion")
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
        id="category_name"
        label="Nombre de servicio"
        type="text"
        placeholder="Limpieza de hogar"
        value={form.category_name}
        onChange={handleFormChange}
      />
      <Input
        id="price"
        label="Precio de servicio"
        type="text"
        placeholder="3000"
        value={form.price}
        onChange={handleFormChange}
      />
      <StyleSelect id="region" name="region" onChange={handleFormChange}>
          <option value="">Seleccione</option>
          <option value="Colombia">Colombia</option>
          <option value="España">España</option>
          <option value="Canada">Canadá</option>
        </StyleSelect>
      <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center' type="submit">
        Crear Servicio
      </button>
    </StyledForm>) : (<div>Cargando....</div>)}
    </Container>
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