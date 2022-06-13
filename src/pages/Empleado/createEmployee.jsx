import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser1, updateEmployee } from "../../services/users-service";
import { Input } from "../../styles/views/Login";


const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-width: 258px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 480px;
  background-color: $fff;
  margin: 0 auto;
  border-radius: 30px;
  justify-content: space-between;
  align-content: center;
  height: 100vh;
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
    const { name, value } = event.target;
    setForm1({ ...form1, [name]: value });
  }

  return (
    <Container>
    {form ? (
      <StyledForm onSubmit={handleSubmit}>
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
      <Input
        id="full_name"
        label="Nompre Personal/Empresa"
        type="text"
        placeholder="John Doe"
        value={form1.full_name}
        onChange={handleFormChange1}
      />

      <Input
        id="region"
        label="País"
        type="text"
        placeholder="Colombia"
        value={form1.region}
        onChange={handleFormChange1}
      />

      <Input
        id="country"
        label="Dirección"
        type="text"
        placeholder="Calle 53, Bogotá, Colombia"
        value={form1.country}
        onChange={handleFormChange1}
      />

      <Input
        id="birth_date"
        label="Fecha de nacimiento"
        type="text"
        placeholder="dd-mm-yyyy"
        value={form1.birth_date}
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

      <Input
        id="biografy"
        label="Mini biografia"
        type="text"
        placeholder="xxxxxxx"
        value={form1.biografy}
        onChange={handleFormChange1}
      />

      <Input
        id="experience"
        label="Experiencia en años"
        type="text"
        placeholder="xxxxxxx"
        value={form1.experience}
        onChange={handleFormChange1}
      />

      <Input
        id="phone"
        label="Celular (10 digitos)"
        type="text"
        placeholder="xxxxxxx"
        value={form.phone}
        onChange={handleFormChange}
      />

      <button class='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center' type="submit">
        Crear
      </button>
    </StyledForm>) : (<div>Cargando....</div>)}
    </Container>
  );
}
