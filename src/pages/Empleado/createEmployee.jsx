import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser1, updateEmployee } from "../../services/users-service";
import { Input } from "../../styles/views/Login";


const StyledForm = styled.form`
  flex-direction: column;
  gap: 2rem;
  min-width: 258px;
`;

const Container = styled.div`
  margin: 0 auto;
  justify-content: space-between;
  align-content: center;
  float: inline-start;
`;
export default function CrearEmpleado() {
  const [form, setForm] = useState({
    email: "",
    phone: "",
    user_type: "employee",
    password: "",
    password_confirmation: "",
  });
  const navigate = useNavigate();
  const [form1, setForm1] = useState({
    full_name: "",
    country: "",
    region: "",
    document_id: "",
    contact: "",
    experience: "",
    biografy: "",
    birth_date: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    createUser1(form).then((user) => {
      updateEmployee(form1, user.user_id);
      navigate("/empleados")
    });
  }

  function handleFormChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  function handleFormChange1(event) {
    console.log(event.target);
    const { name, value } = event.target;
    setForm1({ ...form1, [name]: value });
  }

  return (
    <>
    
    {form ? (
      <StyledForm onSubmit={handleSubmit}>
      <Container>
      <Input
          id="email"
          label="Email"
          type="email"
          placeholder="example@mail.com"
          value={form.email}
          onChange={handleFormChange}
        />

        <Input
          id="password"
          label="Contraseña"
          type="password"
          placeholder="******"
          value={form.password}
          onChange={handleFormChange}
        />
        <Input
          id="password_confirmation"
          label="Confirmar Contraseña"
          type="password"
          placeholder="******"
          value={form.password_confirmation}
          onChange={handleFormChange}
        />
          <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center' type="submit">
        Crear Empleado
      </button>
        </Container>
        <Container>
      <Input
        id="full_name"
        label="Nombre Completo de Empleado"
        type="text"
        placeholder="John Doe"
        value={form1.full_name}
        onChange={handleFormChange1}
      />

        <StyleSelect id="country" name="country" onChange={handleFormChange1}>
          <option value="">Seleccione</option>
          <option value="Colombia">Colombia</option>
          <option value="España">España</option>
          <option value="Canada">Canadá</option>
        </StyleSelect>
      <Input
        id="region"
        label="Dirección"
        type="text"
        placeholder="Calle 53, Bogotá, Colombia"
        value={form1.region}
        onChange={handleFormChange1}
      />
  
</Container>
<Container>
      <Input
        id="birth_date"
        label="Fecha de nacimiento"
        type="date"
        value={form1.birth_date}
        placeholder="dd-mm-yyyy"
        onChange={handleFormChange1}
      />
      <Input
        id="document_id"
        label="Numero de documento"
        type="text"
        placeholder="xxxxxxxxxx"
        value={form1.document_id}
        onChange={handleFormChange1}
      />
      <Input
        id="contact"
        label="Numero de contrato"
        type="text"
        placeholder="xxxxxxxxxx"
        value={form1.contact}
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
      <StyleSelect2 id="experience" name="experience" onChange={handleFormChange1}>
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
      </StyleSelect2>
      <StyleSelect1 id="lada" name="lada" onChange={handleFormChange1}>
        <option value="">Seleccione</option>
        <option value="+57">+57</option>
        <option value="+34">+34</option>
        <option value="+1">+1</option>
      </StyleSelect1>
      <Input
        id="phone"
        label="Celular (10 digitos)"
        type="number"
        placeholder="xxxxxxx"
        value={form.phone}
        onChange={handleFormChange}
      />

      
      </Container>
    </StyledForm>) : (<div>Cargando....</div>)}
    
    </>
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

 const StyleSelect1 = styled.select`
  width: 25%;
  border: 1px solid #787b82;
  padding: 1.225rem;
  background-color: transparent;
  border-radius: 0.5rem;
  color: black;
  margin: 1rem 0;
`;
const StyleSelect2 = styled.select`
  width: 50%;
  border: 1px solid #787b82;
  padding: 1.225rem;
  background-color: transparent;
  border-radius: 0.5rem;
  color: black;
  margin: 1rem 0;
`;
