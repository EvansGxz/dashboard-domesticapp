import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { indexServices, showService, updateService } from "../../services/services-services";
import { indexCategories } from "../../services/categories-services";
import { Input } from "../../styles/views/Login";


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
  {window.screen.width < 810 ? (width: 100%):(width: 80%)}
`;

export default function EditarTarea({onStateChange, onInputChange}) {
  const [categories, setCategories] = useState(null);
  const [form, setForm] = useState(null);
  const id = localStorage.getItem("TaskID");
useEffect(() => {
  showService(id).then(service => {
    setForm({
      service_name: service.service_name,
      category_id: service.category_id,
      category_name: service.category_name,
    })
  })
  indexCategories().then(setCategories)
}, [id])

  function handleSubmit(event) {
    event.preventDefault();
    console.log(form);
    updateService({service_name: form.service_name, category_id: form.category_id}, id).then(() =>{
      onInputChange(false);
      indexServices().then(onStateChange)
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

      <StyleSelect id="category_id" name="category_id" onChange={handleFormChange}>
          <option value="">{form.category_name}</option>
          {categories ? (
            categories.map((category) => (
              <>
              {console.log(category)}
              <option value={category.id}>{category.category_name}</option></>
            ))
            
          ) : null}
          
        </StyleSelect>
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
  {window.screen.width < 810 ? (margin: 1% 6%;):(margin: 0 24%;)}
`;