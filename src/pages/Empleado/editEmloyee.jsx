import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { BASE_URI } from "../../Config";
import { indexEmployee, showEmployee } from "../../services/employee-service";
import { updateEmployee } from "../../services/users-service";
import { Input, Selected } from "../../styles/views/Login";


const StyledForm = styled.form`
  flex-direction: column;
  gap: 2rem;
  min-width: 258px;
`;

const Container = styled.div`
  margin: 1%;
  justify-content: space-between;
  align-content: center;
  float: inline-start;
  width: 30%
`;

export default function EditarEmpleado({onStateChange, onInputChange}) {

  const [form1, setForm1] = useState(null);
  const [employee, setEmployee] = useState(null);
  useEffect(() => {
    const id = localStorage.getItem("EID");

    showEmployee(id).then((user) => {
      setEmployee(user);
      setForm1({
        full_name: user.full_name,
        country: user.country,
        region: user.region,
        document_id: user.document_id,
        contact: user.contact,
        experience: user.experience,
        biografy: user.biografy,
        birth_date: user.birth_date,
        cover: user.cover,
      });
    });
  }, []);
  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData();
    data.append("cover", event.target.cover.files[0]);
    
    updateEmployee(form1, employee.user_id).then(submitAPI(data, employee.user_id))
    onInputChange(false);
  }

  function submitAPI(data, id) {
    fetch(BASE_URI + `employees/${id}`, {
      method: "PATCH",
      body: data,
    })
      .then((response) => response.json())
      .then(indexEmployee().then(onStateChange))
      .catch((error) => console.log(error.message));
  }

  function handleFormChange1(event) {
    const { name, value } = event.target;
    setForm1({ ...form1, [name]: value });
  }

  return (
    <ContainerAll>
    {form1 ? (
      <StyledForm onSubmit={(e) => handleSubmit(e)}>
        <Container>
          <Input
            id="full_name"
            label="Nombre Completo de Empleado"
            type="text"
            placeholder="John Doe"
            value={form1.full_name}
            onChange={handleFormChange1}
          />
          <Input id="cover" name="cover" value={form1.cover.files} label="Imagen" type="file" />
          <Input
            id="document_id"
            label="Numero de documento"
            type="text"
            placeholder="xxxxxxxxxx"
            value={form1.document_id}
            onChange={handleFormChange1}
          />
        </Container>
        <Container>
          <Selected
            id="country"
            label="País"
            name="country"
            onChange={handleFormChange1}
          >
            <option value={form1.country}>{form1.country}</option>
            <option value="Colombia">Colombia</option>
            <option value="España">España</option>
            <option value="Canada">Canadá</option>
          </Selected>
          <Input
            id="region"
            label="Dirección"
            type="text"
            placeholder="Calle 53, Bogotá, Colombia"
            value={form1.region}
            onChange={handleFormChange1}
          />
          <Input
            id="birth_date"
            label="Fecha de nacimiento"
            type="date"
            value={form1.birth_date}
            placeholder={form1.birth_date}
            onChange={handleFormChange1}
          />
          
        </Container>
        <Container>
          <Input
            id="biografy"
            label="Conóceme"
            type="text"
            placeholder="Hola soy"
            value={form1.biografy}
            onChange={handleFormChange1}
          />
          <Selected
            id="experience"
            label="Años de experiencia"
            name="experience"
            onChange={handleFormChange1}
          >
            <option value="">Experiencia</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </Selected>
          <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          type="submit"
          >
          Actualizar Empleado
          </button>
        </Container>
      </StyledForm>
    ) : (
      <div>Cargando....</div>
    )}
  </ContainerAll>
  );
}


const ContainerAll = styled.div`
  margin: 0 6%;
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