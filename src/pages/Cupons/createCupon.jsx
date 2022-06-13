import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCupon } from "../../services/cupon-service";
import { Form, Input, Title } from "../../styles/views/Login";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 480px;
  background-color: $fff;
  margin: 0 auto;
  border-radius: 30px;
  justify-content: space-between;
  align-content: center;
  height: 100vh;
`;

function CreateCupon(){
  const navigate = useNavigate();
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
    createCupon(form).then(navigate("/cupones"))
  }
  return (
    <Container>
      
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

        <button class='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center' type="submit">
          Iniciar Sesión
        </button>
      </Form>
    </Container>
  );
}


export default CreateCupon;