import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { indexEmployee } from "../../services/employee-service";
import { indexHability } from "../../services/habilities-services";
import { createHEmployee } from "../../services/hability-employee-services";

const StyledForm = styled.form`
  flex-direction: column;
  gap: 2rem;
  min-width: 258px;
`;
export default function CrearHEabilidad() {
  const [form, setForm] = useState({
    hability_id: "",
    employee_id: "",
  });
  const [emloyees, setEmployees] = useState(null);
  const [hab, setHab] = useState(null);
  useEffect(() => {
    indexEmployee().then(setEmployees);
    indexHability().then(setHab);
  }, [])
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    console.log(form);
    createHEmployee(form).then(() => {
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
      
        emloyees ? (
          <StyledForm onSubmit={handleSubmit}>

  <StyleSelect id="employee_id" name="employee_id" onChange={handleFormChange}>
    <option value="">--seleccione empleado--</option>
    {
      emloyees.map((employee) =>(
        <option value={employee.employee.id}>{employee.employee.full_name}</option>
      ))
    }
  </StyleSelect>
  <StyleSelect id="hability_id" name="hability_id" onChange={handleFormChange}>
    <option value="">--seleccione habilidad--</option>
    {hab ? (hab.map((hability) =>(
        <option value={hability.id}>{hability.hability}</option>
      ))) : null
      
    }
  </StyleSelect>
 
    <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center' type="submit">
      Crear Empleado
    </button>
  
</StyledForm>) : (<div>Cargando....</div>)
        ) : null}
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
