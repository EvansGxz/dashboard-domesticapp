import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { showCustomer, updateCustomer } from "../../services/customer-services";
import { Input } from "../../styles/views/Login";


const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-width: 258px;
`;

export default function EditarCliente() {
  const [form, setForm] = useState(null);
  const [form1, setForm1] = useState(null);
  const [employee, setEmployee] = useState(null);
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id");
    showCustomer(id).then((user) => {
      setEmployee(user);
      setForm({
        email: user.email,
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
    
    updateCustomer(form1, employee.user_id);
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

      <Input
        id="phone"
        label="Celular (10 digitos)"
        type="text"
        placeholder="xxxxxxx"
        value={form.phone}
        onChange={handleFormChange}
      />

      <button type="submit">
        Actualizar
      </button>
    </StyledForm>) : (<div>Cargando....</div>)}
    </>
  );
}
