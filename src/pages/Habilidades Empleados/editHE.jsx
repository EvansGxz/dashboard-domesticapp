import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { indexEmployee } from "../../services/employee-service";
import { indexHability } from "../../services/habilities-services";
import { indexHEmployee, showHEmployee, updateHEmployee } from "../../services/hability-employee-services";

const StyledForm = styled.form`
  flex-direction: column;
  gap: 2rem;
  min-width: 258px;
`;
export default function EditarHEabilidad({onStateChange, onInputChange}) {
  const [form, setForm] = useState(null);
  const [hab, setHab] = useState(null);
  const [employees, setEmployees] = useState(null);
  const id = localStorage.getItem("HeID");

  useEffect(() => {
    showHEmployee(id).then((hability)=>{
      setForm({
        employee_name: hability.employee_name,
        hability: hability.hability,
        employee_id: hability.employee_id,
        hability_id: hability.hability_id,
      })
    })
    indexEmployee().then(setEmployees);
    indexHability().then(setHab);
  }, [id])

  function handleSubmit(event) {
    event.preventDefault();
    console.log(form);
    updateHEmployee({hability_id: form.hability_id, employee_id: form.employee_id}, id).then(() => {
      onInputChange(false);
      indexHEmployee().then(onStateChange)
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

  <StyleSelect id="employee_id" name="employee_id" onChange={handleFormChange}>
    <option value="">{form.employee_name}</option>
    {employees ? (
      employees.map((employee) =>(
        <>
        <option value={employee.employee.id}>{employee.employee.full_name}</option></>
      ))): null
    }
  </StyleSelect>
  <StyleSelect id="hability_id" name="hability_id" onChange={handleFormChange}>
    <option value="">{form.hability}</option>
    {hab ? (hab.map((hability) =>(
        <option value={hability.id}>{hability.hability}</option>
      ))) : null
      
    }
  </StyleSelect>
 
    <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center' type="submit">
      Crear Empleado
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
  width: 100%;
`;

export const StyleSelect = styled.select`
  width: 80%;
  border: 1px solid #787b82;
  padding: 1.225rem 2rem;
  background-color: transparent;
  border-radius: 0.5rem;
  color: black;
  margin: 1rem auto;
`;
