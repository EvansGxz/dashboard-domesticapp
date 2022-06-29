import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { createService, indexServices } from "../../services/services-services";
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
  width: 80%;
`;

let checkCat = [];

export default function CrearTarea({ onInputChange, onStateChange }) {
  const [categories, setCategories] = useState(null);
  const [form, setForm] = useState({
    service_name: "",
    category_id: "",
  });
  useEffect(() => {
    indexCategories().then(setCategories);
  }, []);

  function cheked(event) {
    if (event.target.checked) {
      console.log(event.target.name);
      checkCat.push(event.target.name);
    }
  }
  function handleSubmit(event) {
    event.preventDefault();
    
    checkCat.forEach((cat) => {
    createService({service_name: form.service_name, category_id:cat }).then(() => {
      onInputChange(false);
      indexServices().then(onStateChange);
    });})
    checkCat = [];
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

            <ContainerCheck>
            {categories
              ? categories.map((category) => (
                <>
                {console.log(category)}
                  <Input
                    id={category.id}
                    label={ category.region.substring(0, 3)+"|"+category.category_name}
                    type="checkbox"
                    onChange={cheked}
                  /></>
                ))
              : null}
          </ContainerCheck>
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              type="submit"
            >
              Crear Servicio
            </button>
          </StyledForm>
        ) : (
          <div>Cargando....</div>
        )}
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

const ContainerCheck = styled.div`
  display: grid;
  gap: 1px;
  max-height: 140px;
  overflow-y: scroll;
  grid-template-columns: repeat(1, 100px);
  margin: 1rem auto;
`;
