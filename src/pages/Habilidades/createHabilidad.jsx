import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { BASE_URI } from "../../Config";
import { indexHability } from "../../services/habilities-services";
import { Input } from "../../styles/views/Login";

const StyledForm = styled.form`
  flex-direction: column;
  gap: 2rem;
  min-width: 258px;
`;
export let hab;
export default function CrearHabilidad() {
  const [habs, setHabilidades] = useState(null);
  useEffect(() => {
    indexHability().then(setHabilidades);
  }, [])
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
  }).then(response => response.json())
}


  function handleFormChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }
  hab = habs;
  return (
    <ContainerAll>
    
    {form ? (
      <StyledForm onSubmit={e=>handleSubmit(e)}>
      
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
        
    </StyledForm>) : (<div>Cargando....</div>)}
    </ContainerAll>
  );
}
const ContainerAll = styled.div`
  display: flex;
  flex-direction: column;
  width: 1080px;
  margin: 5rem 3rem 0 auto;
  border-radius: 30px;
  justify-content: space-between;
  align-content: center;
  height: 55vh;
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
