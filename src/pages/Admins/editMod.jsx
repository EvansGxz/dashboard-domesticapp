import styled from "@emotion/styled";
import { useEffect, useState } from "react";

import { BASE_URI } from "../../Config";
import { indexAdmin, showAdmin, updateAdmin } from "../../services/admin-services";
import { updateUserID } from "../../services/users-service";
import { Input } from "../../styles/views/Login";


const StyledForm = styled.form`
 {window.screen.width < 810 ? (width: 100%):(width: 50%;)}
  margin: 0 20%;
  justify-content: space-between;
  align-content: center;
  float: inline-start;
`;
const ContainerAll = styled.div`
{window.screen.width < 810 ? (margin: 0 6%;):(
  display: flex;
  flex-direction: initial;
  width: 720px;
  margin: 0 auto;
  border-radius: 30px;
  justify-content: space-between;
  align-content: center;
  height: 100vh;
)}
  
`;
const Container = styled.div`
  margin: 5% auto;
  justify-content: space-between;
  align-content: center;
  float: inline-start;
  {window.screen.width < 810 ? (width: 100%):(width: 50%;)}
  
`;
export default function EditMod({onStateChange, onInputChange}) {
  const [seeadmin, setAdmin] = useState(null);
  const [form, setForm] = useState(null);
  const [form1, setForm1] = useState(null);
  useEffect(() => {
    const id = localStorage.getItem("AdminID");
    showAdmin(id).then((user) => {
      setAdmin(user);
      setForm({
        email: user.email,
        user_type: "admin",
        phone: user.phone,
        lada: user.lada
        });
      setForm1({
        nickname: user.nickname,
        role: user.role,
        cover: user.cover,
      });
    });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData();
    data.append("role", event.target.role.value);
    data.append("cover", event.target.cover.files[0]);
    updateAdmin(form1, seeadmin.user_id)
      .then(submitAPI(data, seeadmin.user_id))
      .then(indexAdmin().then(onStateChange))
    updateUserID(form, seeadmin.user_id)
    onInputChange(false);
  }

  function submitAPI(data, id) {
    fetch(BASE_URI+`admin/${id}`,{
    method: "PATCH",
    body: data
  }).then(response =>{
    response.json()
  } )
    .then(indexAdmin().then(onStateChange))
    .catch((error)=>console.log(error.message));
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
    <ContainerAll>
    {form1 ? (
      <StyledForm onSubmit={e=>handleSubmit(e)}>
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
        id="nickname"
        label="Nombre"
        type="text"
        placeholder="Mike Perez"
        value={form1.nickname}
        onChange={handleFormChange1}
      />
       <Input
        id="lada"
        label="Lada"
        type="text"
        placeholder="+51"
        value={form.lada}
        onChange={handleFormChange}
      />

      <Input
        id="phone"
        label="Celular (10 digitos)"
        type="text"
        placeholder="xxxxxxx"
        value={form.phone}
        onChange={handleFormChange}
      />
      <Input id="cover" name="cover" value={form1.cover.files} label="Imagen" type="file" />
      <StyleSelect id="role" name="role">
          <option value={form1.role}>{form1.role}</option>
          <option value="admin">Admnistrador</option>
          <option value="mod">Miembro del Equipo</option>
          <option value="spectator">Espectador</option>
        </StyleSelect>
      <button class='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center' type="submit">
        Actualizar
      </button>
      </Container>
    </StyledForm>) : (<div>Cargando....</div>)}
    </ContainerAll>
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
