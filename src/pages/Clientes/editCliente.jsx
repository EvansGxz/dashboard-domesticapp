import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { BASE_URI } from "../../Config";
import { indexCustomer, showCustomer, updateCustomer } from "../../services/customer-services";
import { Input, Selected } from "../../styles/views/Login";

export default function EditarCliente({onStateChange, onInputChange}) {
  const [form, setForm] = useState(null);
  const [form1, setForm1] = useState(null);
  const [employee, setEmployee] = useState(null);
  useEffect(() => {
    const id = localStorage.getItem("CID");
    showCustomer(id).then((user) => {
      setEmployee(user);
      setForm({
        email: user.email,
        lada: user.lada,
        phone: user.phone,
        user_type: "customer",
        });
      setForm1({
        full_name: user.full_name,
        country: user.country,
        region: user.region,
        document_id: user.document_id,
        client_type: user.client_type,
        cod_refer: user.cod_refer,
        encargado: user.encargado,
        birth_date: user.birth_date,
      });
    });
  }, []);
  function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData();

    data.append("country", event.target.country.value);
    data.append("client_type", event.target.client_type.value);
    data.append("birth_date", event.target.birth_date.value);
    data.append("cover", event.target.cover.files[0]);
    updateCustomer(form1, employee.user_id)
      .then(submitAPI(data, employee.user_id))
      .then(indexCustomer().then(onStateChange))
      .then(onInputChange(false))

    
  }

  function submitAPI(data, id) {
    fetch(BASE_URI+`customers/${id}`,{
    method: "PATCH",
    body: data
  })
    .then((response) => response.json())
    .then(indexCustomer().then(onStateChange))
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
      </Container>
      <Container>
      <Selected id="client_type" name="client_type"
       onChange={handleFormChange1} label="Tipo de cliente">
          <option value="">--tipo de cliente</option>
          <option value="Colombia">Persona</option>
          <option value="España">Empresa</option>
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
      /></Container>
      <Container>
      <Input
        id="lada"
        label="Lada"
        type="text"
        placeholder="+51"
        value={form1.lada}
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

      <Input
        id="cover"
        name="cover"
        label="Imagen"
        type="file"
      />
      <button class='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl w-full md:w-auto px-5 py-2.5 text-center' type="submit">
        Actualizar Cliente
      </button>
    </Container>  
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

