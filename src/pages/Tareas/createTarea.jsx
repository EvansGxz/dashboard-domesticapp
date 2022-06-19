import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createService } from "../../services/services-services";
import { indexCategories } from "../../services/categories-services";
import { Input, Selected } from "../../styles/views/Login";


const StyledForm = styled.form`
  flex-direction: column;
  gap: 2rem;
  min-width: 258px;
`;

const Container = styled.div`
  margin: 5% 6%;
  justify-content: space-between;
  align-content: center;
  float: inline-start;
  width: 80%;
`;

export default function CrearTarea() {
  const [categories, setCategories] = useState(null);
  const [form, setForm] = useState({
    service_name: "",
    category_id: "",
  });
useEffect(() => {
  indexCategories().then(setCategories)
}, [])
  const navigate = useNavigate();
  function handleSubmit(event) {
    event.preventDefault();
    console.log(form);
    createService(form).then(()=>{
      navigate("/tareas")
    })
  }

  function handleFormChange(event) {
   
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  return (
    <ContainerAll>
    <Container>
    {form ? (
      <StyledForm onSubmit={handleSubmit}>
      <Input
        id="service_name"
        label="Nombre de la tarea"
        type="text"
        placeholder="Barrer"
        value={form.service_name}
        onChange={handleFormChange}
      />

      <Selected id="category_id" label="Servicio" name="category_id" onChange={handleFormChange}>
          <option value="">Seleccione</option>
          {categories ? (
            categories.map((category) => (
              <>
              {console.log(category)}
              <option value={category.id}>{category.category_name}</option></>
            ))
            
          ) : null}
          
        </Selected>
      <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center' type="submit">
        Crear Servicio
      </button>
    </StyledForm>) : (<div>Cargando....</div>)}
    </Container>
    </ContainerAll>
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

const ContainerAll = styled.div`
  margin: 0 24%;
`;