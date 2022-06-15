import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showEmployee } from "../../services/employee-service";
import { updateEmployee } from "../../services/users-service";
import { Input } from "../../styles/views/Login";


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

export default function EditarEmpleado() {
  const [form, setForm] = useState(null);
  const [form1, setForm1] = useState(null);
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id");
    showEmployee(id).then((user) => {
      setEmployee(user);
      setForm({
        email: user.email,
        lada: user.lada,
        phone: user.phone,
        user_type: "employee",
        });
      setForm1({
        full_name: user.full_name,
        country: user.country,
        region: user.region,
        document_id: user.document_id,
        contact: user.contact,
        experience: user.experience,
        biografy: user.biografy,
        birth_date: user.birth_date,
      });
    });
  }, []);
  function handleSubmit(event) {
    event.preventDefault();
    updateEmployee(form1, employee.user_id).then(()=> {
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
        label="Nombre Completo de Empleado"
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
      <StyleSelect2 id="experience" name="experience" onChange={handleFormChange1}>
        <option value="">{form1.experience}</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </StyleSelect2>
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
      </button></Container>
    </StyledForm>) : (<div>Cargando....</div>)}
    </ContainerAll>
  );
}

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

 const StyleSelect1 = styled.select`
  width: 25%;
  border: 1px solid #787b82;
  padding: 1.225rem;
  background-color: transparent;
  border-radius: 0.5rem;
  color: black;
  margin: 1rem 0;
`;
const StyleSelect2 = styled.select`
  width: 50%;
  border: 1px solid #787b82;
  padding: 1.225rem;
  background-color: transparent;
  border-radius: 0.5rem;
  color: black;
  margin: 1rem 0;
`;
