import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { indexHability, showHability, updateHability } from "../../services/habilities-services";
import { Input } from "../../styles/views/Login";


const StyledForm = styled.form`
  flex-direction: column;
  gap: 2rem;
  min-width: 258px;
`;

export default function EditarHabilidad({onStateChange, onInputChange}) {
  const [form, setForm] = useState(null);
  const id = localStorage.getItem("HaID");

  useEffect(() => {
    showHability(id).then((hability)=>{
    setForm({
      hability: hability.hability,
      body: hability.body,
    })})
  }, [id])
  

  function handleSubmit(event) {

    event.preventDefault();
    updateHability(form, id).then(() => {
      onInputChange(false);
      indexHability().then(onStateChange)
    });
  }

  function handleFormChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

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
          id="body"
          label="Descripción"
          type="text"
          placeholder="Descripción breve"
          value={form.body}
          onChange={handleFormChange}
        />
       
          <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center' type="submit">
        Actualizar Habilidad
      </button>
        
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
