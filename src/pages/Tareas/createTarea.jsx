import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { createService, indexServices } from "../../services/services-services";
import { indexCategories } from "../../services/categories-services";
import { Input } from "../../styles/views/Login";
import ReactSelect from "react-select";
import { components } from "react-select";
const StyledForm = styled.form`
  flex-direction: column;
  gap: 2rem;
  min-width: 258px;
`;

const Container = styled.div`
  margin: 5% 6%;
  justify-content: space-between;
  align-content: center;
  float: inline-start;
  {window.screen.width < 810 ? (width: 100%):(width: 80%)}
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

export default function CrearTarea({ onInputChange, onStateChange }) {
  const [categories, setCategories] = useState(null);
  const [options, setOptions]=useState(null)
  const [form, setForm] = useState({
    service_name: "",
    category_id: "",
  });
  useEffect(() => {
    indexCategories().then(setCategories);
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    

    options.forEach((cat) => {
      createService({service_name: form.service_name, category_id:cat.value }).then(() => {
        onInputChange(false);
        indexServices().then(onStateChange);
  });
  })
}

  function handleFormChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }
  let categorias = []
  if(categories){
     categories.forEach(employee =>{
      categorias.push({value: employee.id, label: employee.region.substring(0, 3) +" "+employee.category_name})   
    })
  }
  return (
    <ContainerAll>
      <Container>
        {form ? (
          <StyledForm onSubmit={handleSubmit}>
            <Input
              id="service_name"
              label="Nombre de la tarea"
              type="text"
              placeholder="Barrer"
              value={form.service_name}
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
              Crear Servicio
            </button>
          </StyledForm>
        ) : (
          <div>Cargando....</div>
        )}
      </Container>
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
  
  {window.screen.width < 810 ? (margin: 1% 6%;):(margin: 0 24%;)}
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