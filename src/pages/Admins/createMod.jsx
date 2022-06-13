import styled from "@emotion/styled";
import { useState } from "react";
import { updateAdmin } from "../../services/admin-services";
import { createUser1 } from "../../services/users-service";
import { Input } from "../../styles/views/Login";


const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-width: 258px;
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
  });

  function handleSubmit(event) {
    event.preventDefault();
    event.preventDefault();
    createUser1(form).then((user) => {
      updateAdmin(form1, user.user_id);
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
        id="nickname"
        label="Nombre"
        type="text"
        placeholder="Mike Perez"
        value={form1.nickname}
        onChange={handleFormChange1}
      />

      <button type="submit">
        Actualizar
      </button>
    </StyledForm>) : (<div>Cargando....</div>)}
    </>
  );
}
