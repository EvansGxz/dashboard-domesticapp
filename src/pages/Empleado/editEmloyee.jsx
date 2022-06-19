import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URI } from "../../Config";
import { showEmployee } from "../../services/employee-service";
import { Input, Selected } from "../../styles/views/Login";


const StyledForm = styled.form`
  flex-direction: column;
  gap: 2rem;
  min-width: 258px;
`;

const Container = styled.div`
  margin: 1%;
  justify-content: space-between;
  align-content: center;
  float: inline-start;
  width: 30%
`;

export default function EditarEmpleado(ide) {
  const [form, setForm] = useState(null);
  const [form1, setForm1] = useState(null);
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const id = ide.id
    console.log(id)
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
  }, [ide]);
  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData();
    data.append("full_name", event.target.full_name.value);
    data.append("country", event.target.country.value);
    data.append("document_id", event.target.document_id.value);
    data.append("contact", event.target.contact.value);
    data.append("region", event.target.region.value);
    data.append("experience", event.target.experience.value);
    data.append("biografy", event.target.biografy.value);
    data.append("birth_date", event.target.birth_date.value);
    data.append("cover", event.target.cover.files[0]);
    submitAPI(form1, employee.user_id)
  }

  function submitAPI(data, id) {
    console.log(id);
    fetch(BASE_URI+`employees/${id}`,{
    method: "PATCH",
    body: data
  }).then(response => {
    navigate("/empleados")
    response.json()}).catch((error)=>console.log(error.message));
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
      <StyledForm onSubmit={(e) => handleSubmit(e)}>
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
          <Input id="cover" name="cover" label="Imagen" type="file" />
          <Input
            id="phone"
            label="Celular (10 digitos)"
            type="number"
            placeholder="xxxxxxx"
            value={form.phone}
            onChange={handleFormChange}
          />
        </Container>
        <Container>
          <Selected
            id="country"
            label="País"
            name="country"
            onChange={handleFormChange1}
          >
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
            value={form1.birth_date}
            placeholder="dd-mm-yyyy"
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
          <Input
            id="contrato"
            label="Numero de contrato"
            type="file"
            placeholder="xxxxxxxxxx"
            value={form1.contrato}
            onChange={handleFormChange1}
          />

          <Input
            id="biografy"
            label="Conóceme"
            type="text"
            placeholder="Hola soy"
            value={form1.biografy}
            onChange={handleFormChange1}
          />
          <Selected
            id="experience"
            label="Años de experiencia"
            name="experience"
            onChange={handleFormChange1}
          >
            <option value="">Experiencia</option>
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
          </Selected>

          <Input
            id="lada"
            label="Lada"
            type="text"
            placeholder="+1"
            value={form.lada}
            onChange={handleFormChange}
          />
          <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          type="submit"
          >
          Actualizar Empleado
          </button>
        </Container>
      

       
      </StyledForm>
    ) : (
      <div>Cargando....</div>
    )}
  </ContainerAll>
  );
}


const ContainerAll = styled.div`
  margin: 0 6%;
`;


export const StyleSelect = styled.select`
  width: 80%;
  border: 1px solid #787b82;
  padding: 1.225rem 2rem;
  background-color: transparent;
  border-radius: 0.5rem;
  color: black;
  margin: 1rem 0;
`;