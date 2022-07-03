import styled from "@emotion/styled";
import { useState } from "react";
import { BASE_URI } from "../../Config";
import { indexCustomer } from "../../services/customer-services";
import { createUser1 } from "../../services/users-service";
import { Input, Selected } from "../../styles/views/Login";


const StyledForm = styled.form`
  display: flex;
  flex-direction: initial;
  gap: 2rem;
  min-width: 258px;
`;


const Container = styled.div`
margin: 0 auto;
justify-content: space-between;
align-content: center;
float: inline-start;
`;

export default function CrearCliente({onInputChange, onStateChange}) {
  const [form, setForm] = useState({
    email: "",
    lada: "",
    phone: "",
    user_type: "customer",
    password: "",
    password_confirmation: "",
  });
  const [form1, setForm1] = useState({
    full_name: "",
    country: "",
    region: "",
    document_id: "",
    client_type: "",
    cod_refer: "",
    encargado: "",
    birth_date: "",
  });

  function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData();
    data.append("full_name", event.target.full_name.value);
    data.append("country", event.target.country.value);
    data.append("document_id", event.target.document_id.value);
    data.append("client_type", event.target.client_type.value);
    data.append("region", event.target.region.value);
    data.append("cod_refer", event.target.cod_refer.value);
    data.append("encargado", event.target.encargado.value);
    data.append("birth_date", event.target.birth_date.value);
    data.append("cover", event.target.cover.files[0]);

    createUser1(form).then((user) => {
      submitAPI(data, user.user_id);
      onInputChange(false)
    });
  }

  function submitAPI(data, id) {
    fetch(BASE_URI+`customers/${id}`,{
    method: "PATCH",
    body: data
  }).then(response => response.json())
    .then(indexCustomer().then(onStateChange))
    
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
    
    {form ? (<StyledForm onSubmit={e=>handleSubmit(e)}>
      {window.screen.width < 810 ? (
        <>
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
      <Input
        id="full_name"
        label="Nombre Completo/Empresa"
        type="text"
        placeholder="John Doe"
        value={form1.full_name}
        onChange={handleFormChange1}
      />
      
      <Selected id="country" label="Pais" name="country" onChange={handleFormChange1}>
          <option value="">Seleccione</option>
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
      
      <Selected id="client_type" name="client_type"
       onChange={handleFormChange1} label="Tipo de cliente">
          <option value="">--tipo de cliente</option>
          <option value="Persona">Persona</option>
          <option value="Empresa">Empresa</option>
      </Selected>  
      <Input
        id="cod_refer"
        label="Codigo de referido"
        type="text"
        placeholder="xxxxxxx"
        value={form1.cod_refer}
        onChange={handleFormChange1}
      />

      <Input
        id="encargado"
        label="Encargado del cliente"
        type="text"
        placeholder="John"
        value={form1.encargado}
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

      <Input
        id="cover"
        name="cover"
        label="Imagen"
        type="file"
      />
      <button class='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl w-full md:w-auto px-5 py-2.5 text-center' type="submit">
        Crear Cliente
      </button>
      
    </Container>  
        </>
      ) : (
        <>
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
      <Input
        id="full_name"
        label="Nombre Completo/Empresa"
        type="text"
        placeholder="John Doe"
        value={form1.full_name}
        onChange={handleFormChange1}
      />
      
      <Selected id="country" label="Pais" name="country" onChange={handleFormChange1}>
          <option value="">Seleccione</option>
          <option value="Colombia">Colombia</option>
          <option value="España">España</option>
          <option value="Canada">Canadá</option>
        </Selected>
      </Container>
            <Container>
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
      
      <Selected id="client_type" name="client_type"
       onChange={handleFormChange1} label="Tipo de cliente">
          <option value="">--tipo de cliente</option>
          <option value="Persona">Persona</option>
          <option value="Empresa">Empresa</option>
      </Selected>  
      <Input
        id="cod_refer"
        label="Codigo de referido"
        type="text"
        placeholder="xxxxxxx"
        value={form1.cod_refer}
        onChange={handleFormChange1}
      />
</Container>
      <Container>
      <Input
        id="encargado"
        label="Encargado del cliente"
        type="text"
        placeholder="John"
        value={form1.encargado}
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

      <Input
        id="cover"
        name="cover"
        label="Imagen"
        type="file"
      />
      <button class='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl w-full md:w-auto px-5 py-2.5 text-center' type="submit">
        Crear Cliente
      </button>
      
    </Container>  
        </>
      )}
      
      
    </StyledForm>) : (<div>Cargando....</div>)}
    
    </ContainerAll>
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

const ContainerAll = styled.div`
  margin: 0 6%;
`;
