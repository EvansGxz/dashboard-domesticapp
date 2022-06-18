import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createHability, showHability } from "../../services/habilities-services";
import { Input } from "../../styles/views/Login";


const StyledForm = styled.form`
  flex-direction: column;
  gap: 2rem;
  min-width: 258px;
`;

export default function EditarHabilidad() {
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id");
    showHability(id).then((hability)=>{
    setForm({
      hability: hability.hability,
      body: hability.body,
    })})
  })
  const [form, setForm] = useState(null);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    createHability(form).then((user) => {
      navigate("/habilidades")
    });
  }

  function handleFormChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  return (
    <ContainerAll>
    
    {form ? (
      <StyledForm onSubmit={handleSubmit}>
      
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
        Crear Empleado
      </button>
        
    </StyledForm>) : (<div>Cargando....</div>)}
    </ContainerAll>
  );
}
const ContainerAll = styled.div`
  display: flex;
  flex-direction: column;
  width: 1080px;
  margin: 5rem auto 0 auto;
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