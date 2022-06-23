import styled from "@emotion/styled";
import { useState } from "react";
import { BASE_URI } from "../../Config";
import { indexAdmin } from "../../services/admin-services";
import { createUser1 } from "../../services/users-service";
import { Input, Selected } from "../../styles/views/Login";


const StyledForm = styled.form`
  flex-direction: column;
  gap: 2rem;
  min-width: 258px;
`;

const Container = styled.div`
  margin: 5% auto;
  justify-content: space-between;
  align-content: center;
  float: inline-start;
  width: 50%;
`;

export default function CrearMod({onInputChange, onStateChange}) {
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
  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData();

    data.append("role", event.target.role.value);
    data.append("nickname", event.target.nickname.value);
    data.append("cover", event.target.cover.files[0]);

    createUser1(form).then((user) => {
      submitAPI(data, user.user_id);
      onInputChange(false)
    });
    
  }
  function submitAPI(data, id) {
    fetch(BASE_URI+`admin/${id}`,{
    method: "PATCH",
    body: data
  }).then(response => response.json())
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
    {form ? (
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
        <Selected id="role" label="Rol" name="role" onChange={handleFormChange1}>
          <option value="">--seleccionar rol--</option>
          <option value="admin">Admnistrador</option>
          <option value="mod">Miembro del Equipo</option>
          <option value="spectator">Espectador</option>
        </Selected>
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
      <Input
        id="cover"
        name="cover"
        label="Imagen"
        type="file"
      />

      <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center' type="submit">
        Crear Administrador
      </button>
     </Container> 
    </StyledForm>) : (<div>Cargando....</div>)}
    
    </ContainerAll>
  );
}

const ContainerAll = styled.div`
  margin: 0 6%;
`;

