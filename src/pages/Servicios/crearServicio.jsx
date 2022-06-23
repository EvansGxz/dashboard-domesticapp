import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { BASE_URI } from "../../Config";
import { indexCategories, indexsector } from "../../services/categories-services";
import { Input, Selected } from "../../styles/views/Login";

const StyledForm = styled.form`
  flex-direction: column;
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

let checkCat = [];

export default function CrearServicio({onInputChange, onStateChange}) {
  const [sectores, setSectores] = useState();
  const [form, setForm] = useState({
    category_name: "",
    price_col_complete: "",
    price_col_half: "",
    price_spain: "",
    region: "",
    body: "",
    sector_id: "",
  });
  useEffect(() => {
    indexsector().then(setSectores);
  }, []);
  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData();

    data.append("category_name", event.target.category_name.value);
    data.append("price_col_complete", event.target.price_col_complete.value);
    data.append("price_col_half", event.target.price_col_half.value);
    data.append("price_spain", event.target.price_spain.value);
    data.append("body", event.target.body.value);
    data.append("image", event.target.image.files[0]);
    data.append("sector_id", event.target.sector_id.value);
    checkCat.forEach((cat) => {
      data.append("region", cat);
      submitAPI(data);
    });
  }

  function cheked(event) {
    if (event.target.checked) {
      checkCat.push(event.target.name);
    }
  }

  function submitAPI(data) {
    fetch(BASE_URI + "categories", {
      method: "POST",
      body: data,
    }).then((response) => response.json())
      .then(()=>{
        onInputChange(false)
        indexCategories().then(onStateChange)
      });
  }

  function handleFormChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  return (
    <ContainerAll>
      {form ? (
        <StyledForm onSubmit={(e) => handleSubmit(e)}>
          <Container>
            <Input
              id="category_name"
              label="Nombre de servicio"
              type="text"
              placeholder="Limpieza de hogar"
              value={form.category_name}
              onChange={handleFormChange}
            />
            <ContainerCheck label="Algo">
              <Input
                name="Colombia"
                label="Colombia"
                type="checkbox"
                value="Colombia"
                onChange={cheked}
              />
              <Input
                name="España"
                label="España"
                type="checkbox"
                value="España"
                onChange={cheked}
              />
              <Input
                name="Canada"
                label="Canada"
                type="checkbox"
                value="Canada"
                onChange={cheked}
              />
            </ContainerCheck>
            <Input
              id="body"
              label="Descripción"
              type="text"
              placeholder="Cuida tus servicios..."
              value={form.body}
              onChange={handleFormChange}
            />
            <Selected
              id="sector_id"
              name="sector_id"
              label="Categoria"
              onChange={handleFormChange}
            >
              <option value="">Seleccione</option>
              {sectores
                ? sectores.map((sector) => (
                    <option value={sector.id}>{sector.name}</option>
                  ))
                : null}
            </Selected>

          </Container>
          <Container>
            
                <Input
                  id="price_col_complete"

                  label="Precio Jornada Completa"
                  type="text"
                  placeholder="3000"
                  value={form.price_col_complete}
                  onChange={handleFormChange}
                />
                <Input
                  id="price_col_half"
                  label="Precio Jornada Media"
                  type="text"
                  placeholder="3000"
                  value={form.price_col_half}
                  onChange={handleFormChange}
                />
              
                <Input
                  id="price_spain"
                  label="Precio Jornada por Hora"
                  type="text"
                  placeholder="3000"
                  value={form.price_spain}
                  onChange={handleFormChange}
                />
            <Input id="image" name="image" label="Imagen" type="file" />
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              type="submit"
            >
              Crear Servicio
            </button>
          </Container>
        </StyledForm>
      ) : (
        <div>Cargando....</div>
      )}
    </ContainerAll>
  );
}

const ContainerCheck = styled.div`
  width: fit-content;
  display: grid;
  display: grid;
  gap: 1px;
  grid-template-columns: repeat(3, 80px);
`;

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
  margin: 0 6%;
`;
