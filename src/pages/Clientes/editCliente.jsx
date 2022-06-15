import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showCustomer, updateCustomer } from "../../services/customer-services";
import { Input } from "../../styles/views/Login";

export default function EditarCliente() {
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [form1, setForm1] = useState(null);
  const [employee, setEmployee] = useState(null);
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id");
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
    updateCustomer(form1, employee.user_id).then(()=> {
      navigate("/clientes")
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
    <ContainerAll>
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
        id="full_name"
        label="Nombre Personal/Empresa"
        type="text"
        placeholder="John Doe"
        value={form1.full_name}
        onChange={handleFormChange1}
      />

      <Input
        id="region"
        label="País"
        type="text"
        placeholder="Calle 53, Bogotá, Colombia"
        value={form1.region}
        onChange={handleFormChange1}
      />
      <StyleSelect id="country" name="country" onChange={handleFormChange1}>
        <option value="">{form1.country}</option>
        <option value="Colombia">Colombia</option>
        <option value="España">España</option>
        <option value="Canada">Canadá</option>
      </StyleSelect>

      <Input
        id="birth_date"
        label="Fecha de nacimiento"
        type="date"
        placeholder="dd-mm-yyyy"
        value={form1.birth_date}
        onChange={handleFormChange1}
      /></Container>
      <Container>
      <Input
        id="document_id"
        label="Numero de documento"
        type="text"
        placeholder="xxxxxxxxxx"
        value={form1.document_id}
        onChange={handleFormChange1}
      />
      <Input
        id="client_type"
        label="Tipo de cliente"
        type="text"
        placeholder="Persona/Empresa"
        value={form1.client_type}
        onChange={handleFormChange1}
      />

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
      <StyleSelect1 id="lada" name="lada" onChange={handleFormChange}>
        <option value="">{form.lada}</option>
        <option value="+57">+57</option>
        <option value="+34">+34</option>
        <option value="+1">+1</option>
      </StyleSelect1>

      <Input
        id="phone"
        label="Celular (10 digitos)"
        type="text"
        placeholder="xxxxxxx"
        value={form.phone}
        onChange={handleFormChange}
      />

      <button class='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center' type="submit">
        Actualizar
      </button>
      </Container>
    </StyledForm>) : (<div>Cargando....</div>)}
    </ContainerAll>
  );
}

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

const ContainerAll = styled.div`
   display: flex;
  flex-direction: column;
  width: 720px;
  margin: 0 auto;
  border-radius: 30px;
  justify-content: space-between;
  align-content: center;
  height: 100vh;
`;

const StyleSelect = styled.select`
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
