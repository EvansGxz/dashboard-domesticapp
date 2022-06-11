import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCupon } from "../../services/cupon-service";
import { Form, Input, Title } from "../../styles/views/Login";

function CreateCupon(){
  const navigate = useNavigate();
  const [errors, setErrors] = useState(new Error());
  const [form, setForm] = useState({
    name: "",
    discount: "",
    cupon_title: "",
  });
  function handleFormChange(event) {
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    createCupon(form).then(navigate("/cupones")).catch((error) => {
      setErrors(error);
    })
  }
  return (
    <div>
      
      <Title>Crear cupón</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          id="name"
          label="Codigo"
          type="text"
          placeholder="domestic100"
          value={form.name}
          onChange={handleFormChange}
        />

        <Input
          id="discount"
          label="Descuento"
          type="text"
          placeholder="15"
          value={form.discount}
          onChange={handleFormChange}
        />
         <Input
          id="cupon_title"
          label="Titulo"
          type="cupon_title"
          placeholder="Aniversario #2"
          value={form.cupon_title}
          onChange={handleFormChange}
        />

        <button type="submit">
          Iniciar Sesión
        </button>
      </Form>
    </div>
  );
}


export default CreateCupon;