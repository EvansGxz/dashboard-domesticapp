import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { indexCategories, showCategory, updateCategory } from "../../services/categories-services";
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
  width: 80%;
  background-color: $fff;
  margin: 5% 15%;
  border-radius: 30px;
  justify-content: space-between;
  align-content: center;
`;

export default function EditarServicio({onStateChange, onInputChange}) {
  const [form, setForm] = useState(null);
  const id = localStorage.getItem("ServID");
  useEffect(() =>{
  
    showCategory(id).then((category) =>{
      setForm({
        category_name: category.category_name,
        price_col_complete: category.price_col_complete,
        price_col_half: category.price_col_half,
        price_spain: category.price_spain,
      })
    })
  }, [id])

  function handleSubmit(event) {
    event.preventDefault();

    updateCategory(form, id).then(()=>{
      onInputChange(false);
      indexCategories().then(onStateChange)
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
        id="price_col_complete"
        label="Precio de servicio Colombia"
        type="text"
        placeholder="3000"
        value={form.price_col_complete}
        onChange={handleFormChange}
      />
      <Input
        id="price_col_half"
        label="Precio de servicio Colombia"
        type="text"
        placeholder="3000"
        value={form.price_col_half}
        onChange={handleFormChange}
      />
    
      <Input
        id="price_spain"
        label="Precio de servicio Europa"
        type="text"
        placeholder="3000"
        value={form.price_spain}
        onChange={handleFormChange}
      />
      <button class='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center' type="submit">
        Actualizar Servicio
      </button>
    </StyledForm>) : (<div>Cargando....</div>)}
    </Container>
  );
}
