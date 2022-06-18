import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { BASE_URI } from "../../Config";
import { createECategory, indexCategories } from "../../services/categories-services";
import { createUser1 } from "../../services/users-service";
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
let checkCat=[]
export default function CrearEmpleado() {
  const [categories, setCategories] = useState()
  const [form, setForm] = useState({
    email: "",
    lada: "",
    phone: "",
    user_type: "employee",
    password: "",
    password_confirmation: "",
  });
  const [form1, setForm1] = useState({
    full_name: "",
    country: "",
    region: "",
    document_id: "",
    contrato: "",
    experience: "",
    biografy: "",
    birth_date: "",
  });
  useEffect(() => {
    indexCategories().then(setCategories)
  }, [])
  function handleSubmit(event) {
    event.preventDefault();
    
    const data = new FormData();
    data.append("full_name", event.target.full_name.value);
    data.append("country", event.target.country.value);
    data.append("document_id", event.target.document_id.value);
    data.append("contrato", event.target.contrato.files[0]);
    data.append("region", event.target.region.value);
    data.append("experience", event.target.experience.value);
    data.append("biografy", event.target.biografy.value);
    data.append("birth_date", event.target.birth_date.value);
    data.append("cover", event.target.cover.files[0]);

    let id = null;
    createUser1(form).then((user) => {
      id = user.user_id
      submitAPI(data, id);

      checkCat.forEach((cat)=>{
        createECategory({employee_id: id, category_id: cat})
      })
    });
    
    
  }
  
  function cheked(event){
    
    if(event.target.checked) {
      checkCat.push(event.target.name)
    }
    console.log(checkCat);
  }
  
  function handleFormChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  function handleFormChange1(event) {
    const { name, value } = event.target;
    setForm1({ ...form1, [name]: value });
  }
  function submitAPI(data, id) {
      console.log(id);
      fetch(BASE_URI+`employees/${id}`,{
      method: "PATCH",
      body: data
    }).then(response => response.json()).catch((error)=>console.log(error.message));
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
          <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center' type="submit">
        Crear Empleado
      </button>
        </Container>
        <Container>
      <Input
        id="full_name"
        label="Nombre Completo de Empleado"
        type="text"
        placeholder="John Doe"
        value={form1.full_name}
        onChange={handleFormChange1}
      />

        <StyleSelect id="country" name="country" onChange={handleFormChange1}>
          <option value="">Seleccione</option>
          <option value="Colombia">Colombia</option>
          <option value="España">España</option>
          <option value="Canada">Canadá</option>
        </StyleSelect>
      <Input
        id="region"
        label="Dirección"
        type="text"
        placeholder="Calle 53, Bogotá, Colombia"
        value={form1.region}
        onChange={handleFormChange1}
      />
  
</Container>
<Container>
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
      <Input
        id="contrato"
        label="Numero de contrato"
        type="file"
        placeholder="xxxxxxxxxx"
        value={form1.contrato}
        onChange={handleFormChange1}
      />
      {
        categories ? (
          categories.map((category)=>(
            <Input
              id={category.id}
              label={category.category_name}
              type="checkbox"
              value={form1.contrato}
              onChange={cheked}
            />
          ))
        ) : null
      }
      
  
</Container>
<Container>
      <Input
        id="biografy"
        label="Conóceme"
        type="text"
        placeholder="Hola soy"
        value={form1.biografy}
        onChange={handleFormChange1}
      />
      <StyleSelect2 id="experience" name="experience" onChange={handleFormChange1}>
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
      </StyleSelect2>
      <StyleSelect1 id="lada" name="lada" onChange={handleFormChange}>
        <option value="">Seleccione</option>
        <option value="+57">+57</option>
        <option value="+34">+34</option>
        <option value="+1">+1</option>
      </StyleSelect1>
      <Input
        id="phone"
        label="Celular (10 digitos)"
        type="number"
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
      </Container>
    </StyledForm>) : (<div>Cargando....</div>)}
    
    </ContainerAll>
  );
}
const ContainerAll = styled.div`
  display: flex;
  flex-direction: column;
  width: 1080px;
  margin: 6rem auto 0 auto;
  border-radius: 30px;
  justify-content: space-between;
  align-content: center;
  height: 55vh;
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
