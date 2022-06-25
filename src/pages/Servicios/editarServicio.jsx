import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { BASE_URI } from "../../Config";
import {
  indexCategories,
  showCategory,
  updateCategory,
} from "../../services/categories-services";
import { Input } from "../../styles/views/Login";

const StyledForm = styled.form`
  display: flex;
  flex-direction: initial;
  gap: 2rem;
  min-width: 258px;
`;

const Container = styled.div`
margin: 5% auto;
justify-content: space-between;
align-content: center;
float: inline-start;
width: 50%;
`;

export default function EditarServicio({ onStateChange, onInputChange }) {
  const [form, setForm] = useState(null);
  const id = localStorage.getItem("ServID");
  useEffect(() => {
    showCategory(id).then((category) => {
      
      setForm({
        category_name: category.category_name,
        price_col_complete: category.price_col_complete,
        price_col_half: category.price_col_half,
        price_spain: category.price_spain,
        image: category.image,
      });
    });
  }, [id]);

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData();
    
    data.append("image", event.target.image.files[0]);
    updateCategory(form, id)
    .then(indexCategories().then(onStateChange))
    .then(submitAPI(data, id))
    onInputChange(false);
  }
  function submitAPI(data, id) {
    fetch(BASE_URI + `categories/${id}`, {
      method: "PATCH",
      body: data,
    }).then(indexCategories().then(onStateChange))
      .then((response) => response.json())
      .catch((error) => console.log(error.message));
  }
  function handleFormChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  return (
    <>
      {form ? (
        <StyledForm onSubmit={e=>handleSubmit(e)}>
          <Container>
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
          <Input
            id="image" name="image"
            value={form.image.files}
            label="Imagen"
            type="file"
          />
          <button
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            type="submit"
          >
            Actualizar Servicio
          </button>
          </Container>
        </StyledForm>
      ) : (
        <div>Cargando....</div>
      )}
    </>
  );
}
