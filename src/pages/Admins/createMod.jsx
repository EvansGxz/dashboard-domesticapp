import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateAdmin } from "../../services/admin-services";
import { createUser1 } from "../../services/users-service";
import { Input } from "../../styles/views/Login";


const StyledForm = styled.form`
  flex-direction: column;
  gap: 2rem;
  min-width: 258px;
`;

const Container = styled.div`
  width: 300px;
  margin: 6rem 2rem;
  justify-content: space-between;
  align-content: center;
  float: inline-start;
`;

export default function CrearMod() {
  const [form, setForm] = useState({
    email: "",
    user_type: "admin",
    password: "",
    password_confirmation: "",
  });
  const [form1, setForm1] = useState({
    nickname: "",
    role: "",
  });
  const navigate = useNavigate();
  function handleSubmit(event) {
    event.preventDefault();
    createUser1(form).then((user) => {
      updateAdmin(form1, user.user_id);
      navigate("/gestion");
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
        <StyleSelect id="role" name="role" onChange={handleFormChange1}>
          <option value="">--seleccionar rol--</option>
          <option value="admin">Admnistrador</option>
          <option value="mod">Miembro del Equipo</option>
          <option value="spectator">Espectador</option>
        </StyleSelect>
      <Input
        id="password"
        label="Contraseña"
        type="password"
        placeholder="******"
        value={form.password}
        onChange={handleFormChange}
      />
      </Container>
      <Container>
        
      <Input
        id="password_confirmation"
        label="Confirmar Contraseña"
        type="password"
        placeholder="******"
        value={form.password_confirmation}
        onChange={handleFormChange}
      />
      <Input
        id="nickname"
        label="Nombre"
        type="text"
        placeholder="Mike Perez"
        value={form1.nickname}
        onChange={handleFormChange1}
      />

      <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center' type="submit">
        Crear Administrador
      </button>
     </Container> 
    </StyledForm>) : (<div>Cargando....</div>)}
    
    </>
  );
}

const StyleSelect = styled.select`
  width: 80%;
  border: 1px solid #787b82;
  padding: 1.225rem 2rem;
  background-color: transparent;
  border-radius: 0.5rem;
  color: black;
  margin: 1rem 0;
`;