import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import ReactSelect from "react-select";
import { BASE_URI } from "../../Config";
import {
  createECategory,
  indexCategories,
} from "../../services/categories-services";
import { indexEmployee } from "../../services/employee-service";
import { createUser1 } from "../../services/users-service";
import { Input, Selected } from "../../styles/views/Login";
import { components } from "react-select";

const StyledForm = styled.form`
  gap: 2rem;
  min-width: 258px;
  display: flex;
  flex-direction: initial;
`;

const Container = styled.div`
  margin: 0 auto;
  justify-content: space-between;
  align-content: center;
  float: inline-start;
  {window.screen.width < 810 ? (width: 100%):(width: 30%)}
  
`;

export const Options = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};
export default function CrearEmpleado({onInputChange, onStateChange}) {
  const [categories, setCategories] = useState();
  const [options, setOptions]=useState(null)
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
    indexCategories().then(setCategories);
  }, []);
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
    onInputChange(false)
    createUser1(form)
      .then((user) => {submitAPI(data, user)})

  }


  function handleFormChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  function handleFormChange1(event) {
    const { name, value } = event.target;
    setForm1({ ...form1, [name]: value });
  }
  function submitAPI(data, user) {
    fetch(BASE_URI + `employees/${user.user_id}`, {
      method: "PATCH",
      body: data,
    })
      .then((response) => {response.json()})
      .then(indexEmployee().then(onStateChange))

      options.forEach((cat) => {
        createECategory({ employee_id: user.id, category_id: cat.value });
    });
  }
  let categorias = []
  if(categories){
     categories.forEach(employee =>{
      categorias.push({value: employee.id, label: employee.region.substring(0, 3) +" "+employee.category_name})   
    })
  }
  return (
    <ContainerAll>
      {form ? (
        <StyledForm onSubmit={(e) => handleSubmit(e)}>
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
              label="Contrase??a"
              type="password"
              placeholder="******"
              value={form.password}
              onChange={handleFormChange}
            />
            <Input
              id="password_confirmation"
              label="Confirmar Contrase??a"
              type="password"
              placeholder="******"
              value={form.password_confirmation}
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
           
            <Selected
              id="country"
              label="Pa??s"
              name="country"
              onChange={handleFormChange1}
            >
              <option value="">Seleccione</option>
              <option value="Colombia">Colombia</option>
              <option value="Espa??a">Espa??a</option>
              <option value="Canada">Canad??</option>
            </Selected>
            <Input
              id="region"
              label="Direcci??n"
              type="text"
              placeholder="Calle 53, Bogot??, Colombia"
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
              label="Con??ceme"
              type="text"
              placeholder="Hola soy"
              value={form1.biografy}
              onChange={handleFormChange1}
            />
            <Selected
              id="experience"
              label="A??os de experiencia"
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
          
            <Input
              id="phone"
              label="Celular (10 digitos)"
              type="number"
              placeholder="xxxxxxx"
              value={form.phone}
              onChange={handleFormChange}
            />
      
          <span
        class="d-inline-block"
        data-toggle="popover"
        data-trigger="focus"
        data-content="Selecciona un servicio"
      >
      {
       <ReactSelect
        
          options={categorias}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{
            Options
          }}
          onChange={setOptions}
          allowSelectAll={true}
          value={options}
        />
      }
        
      </span>
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            type="submit"
          >
            Crear Empleado
          </button>
          </Container>
          </>
        ):(
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
              label="Contrase??a"
              type="password"
              placeholder="******"
              value={form.password}
              onChange={handleFormChange}
            />
            <Input
              id="password_confirmation"
              label="Confirmar Contrase??a"
              type="password"
              placeholder="******"
              value={form.password_confirmation}
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
            </Container>
          <Container>
            <Selected
              id="country"
              label="Pa??s"
              name="country"
              onChange={handleFormChange1}
            >
              <option value="">Seleccione</option>
              <option value="Colombia">Colombia</option>
              <option value="Espa??a">Espa??a</option>
              <option value="Canada">Canad??</option>
            </Selected>
            <Input
              id="region"
              label="Direcci??n"
              type="text"
              placeholder="Calle 53, Bogot??, Colombia"
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
          
            <Input
              id="contrato"
              label="Numero de contrato"
              type="file"
              placeholder="xxxxxxxxxx"
              value={form1.contrato}
              onChange={handleFormChange1}
            />
          </Container>
          <Container>
            <Input
              id="biografy"
              label="Con??ceme"
              type="text"
              placeholder="Hola soy"
              value={form1.biografy}
              onChange={handleFormChange1}
            />
            <Selected
              id="experience"
              label="A??os de experiencia"
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
          
            <Input
              id="phone"
              label="Celular (10 digitos)"
              type="number"
              placeholder="xxxxxxx"
              value={form.phone}
              onChange={handleFormChange}
            />
          
          <span
        class="d-inline-block"
        data-toggle="popover"
        data-trigger="focus"
        data-content="Selecciona un servicio"
      >
      {
       <Checkbox
          label="Servicios"
          options={categorias}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{
            Options
          }}
          onChange={setOptions}
          allowSelectAll={true}
          value={options}
        />
      }
        
      </span>

          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            type="submit"
          >
            Crear Empleado
          </button>
          </Container>
          </>
        )}
          
          
        </StyledForm>
      ) : (
        <div>Cargando....</div>
      )}
    </ContainerAll>
  );
}

const ContainerAll = styled.div`
  margin: 1% 6%;
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

export const Checkbox = ({
  id,
  name,
  placeholder,
  label,
  error,
  innerRef,
  ...rest
}) => {
  name ||= id;
  return (
    <ContainerInput>
      {label && <Label htmlFor={id}>{label}</Label>}
      <ReactSelect
        id={id}
        name={name}
        ref={innerRef}
        placeholder={placeholder}
        {...rest}
      />
     
    </ContainerInput>
  );
};

export const ContainerInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 1rem 0;
  width: 100%;
`;
export const Label = styled.label`
  color: #787b82;
`;