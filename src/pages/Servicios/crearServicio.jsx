import styled from "@emotion/styled";
import { useState } from "react";
import { createCategory } from "../../services/categories-services";
import { Input } from "../../styles/views/Login";


const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-width: 258px;
`;

export default function CrearServicio() {
  const [form, setForm] = useState({
    category_name: "",
    price: "",
  });


  function handleSubmit(event) {
    event.preventDefault();
    createCategory(form)
  }

  function handleFormChange(event) {
   
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  return (
    <>
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

      <button type="submit">
        Crear
      </button>
    </StyledForm>) : (<div>Cargando....</div>)}
    </>
  );
}
