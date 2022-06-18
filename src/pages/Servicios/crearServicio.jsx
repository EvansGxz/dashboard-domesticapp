import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { BASE_URI } from "../../Config";
import { indexsector } from "../../services/categories-services";
import { Input } from "../../styles/views/Login";


const StyledForm = styled.form`
  flex-direction: column;
  gap: 2rem;
  min-width: 258px;
`;

const Container = styled.div`
  width: 300px;
  margin: 4rem 18rem 0 18rem;
  justify-content: space-between;
  align-content: center;
  float: inline-start;
`;

export default function CrearServicio() {
  const [sectores, setSectores] = useState()
  const [form, setForm] = useState({
    category_name: "",
    price: "",
    region: "",
    body: "",
    sector_id: ""
  });
  useEffect(() => {
    indexsector().then(setSectores)
  }, [])
  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData();

    data.append("category_name", event.target.category_name.value);
    data.append("price", event.target.price.value);
    data.append("body", event.target.body.value);
    data.append("region", event.target.region.value);
    data.append("image", event.target.image.files[0]);
    data.append("sector_id", event.target.sector_id.value);
    submitAPI(data);
    
  }
  function submitAPI(data) {
    fetch(BASE_URI+"categories",{
      method: "POST",
      body: data
    }).then(response => response.json())
  }

  function handleFormChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  return (
    <ContainerAll>
    <Container>
    {form ? (
      <StyledForm onSubmit={e => handleSubmit(e)}>
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
      <Input
        id="body"
        label="Descripción"
        type="text"
        placeholder="Cuida tus servicios..."
        value={form.body}
        onChange={handleFormChange}
      />
      <StyleSelect id="region" name="region" onChange={handleFormChange}>
        <option value="">Seleccione</option>
        <option value="Colombia">Colombia</option>
        <option value="España">España</option>
        <option value="Canada">Canadá</option>
      </StyleSelect>

      <StyleSelect id="sector_id" name="sector_id" onChange={handleFormChange}>
        <option value="">Seleccione</option>
        {
          sectores ? (
            sectores.map((sector) =>(
              <option value={sector.id}>{sector.name}</option>
            ))
            
          ) : null
        }
        
      </StyleSelect>

        <Input
        id="image"
        name="image"
        label="Imagen"
        type="file"
      />
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
  display: flex;
  flex-direction: column;
  width: 1080px;
  border-radius: 30px;
  justify-content: space-between;
  align-content: center;
  height: 55vh;
`;