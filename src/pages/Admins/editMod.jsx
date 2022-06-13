import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { showAdmin, updateAdmin } from "../../services/admin-services";
import { Input } from "../../styles/views/Login";


const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-width: 258px;
`;

export default function EditMod() {
  const [seeadmin, setAdmin] = useState(null);
  const [form, setForm] = useState(null);
  const [form1, setForm1] = useState(null);
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id");
    showAdmin(id).then((user) => {
      setAdmin(user);
      setForm({
        email: user.email,
        user_type: "admin",
        });
      setForm1({
        nickname: user.nickname,
      });
    });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    
    updateAdmin(form1, seeadmin.user_id);
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
