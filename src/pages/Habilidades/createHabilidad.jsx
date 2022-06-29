import styled from "@emotion/styled";
import { useState } from "react";
import { BASE_URI } from "../../Config";
import { indexHability } from "../../services/habilities-services";
import { Input } from "../../styles/views/Login";

const StyledForm = styled.form`
  flex-direction: column;
  gap: 2rem;
  min-width: 258px;
`;

export default function CrearHabilidad({onInputChange, onStateChange}) {

  const [form, setForm] = useState({
    hability: "",
    body: "",
    image: "",
  });

  function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData();

    data.append("hability", event.target.hability.value);
    data.append("body", event.target.body.value);
    data.append("image", event.target.image.files[0]);

    submitAPI(data)
  }

  function submitAPI(data) {
    fetch(BASE_URI+`hability`,{
    method: "POST",
    body: data
  }).then(response => response.json()).then(() => {
    onInputChange(false)
    indexHability().then(onStateChange)
  })
}


  function handleFormChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  return (
    <ContainerAll>
    
    {form ? (
      <StyledForm onSubmit={e=>handleSubmit(e)}>
      <Container>
      <Input
          id="hability"
          label="Habilidad"
          type="text"
          placeholder="Nombre de la habilidad"
          value={form.hability}
          onChange={handleFormChange}
        />
        <Input
        id="image"
        name="image"
        label="Imagen"
        type="file"
        />

        <Input
          id="body"
          label="Descripción"
          type="text"
          placeholder="Descripción breve"
          value={form.body}
          onChange={handleFormChange}
        />
       
          <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center' type="submit">
        Crear Habilidad 
      </button>
        </Container>
    </StyledForm>) : (<div>Cargando....</div>)}
    </ContainerAll>
  );
}
const ContainerAll = styled.div`
  margin: 5% 6%;
  justify-content: space-between;
  align-content: center;
  float: inline-start;
  width: 90%;
`;

export const StyleSelect = styled.select`
 flex-direction: column;
  gap: 2rem;
  min-width: 258px;
  
`;
const Container = styled.div`

`;