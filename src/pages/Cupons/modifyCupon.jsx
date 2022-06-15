import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showCupon, updateCupon } from "../../services/cupon-service";
import { Form, Input } from "../../styles/views/Login";

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

function ModifyCupon(){
  
  const [form, setForm] = useState(null);
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id");
    
    showCupon(id).then((cupon) => {
      setForm({
        name: cupon.name,
        discount: cupon.discount,
        end_date: cupon.end_date,
        cupon_title: cupon.cupon_title,
      });
    });
  }, []);

  const [errors, setErrors] = useState({
    name: "",
    discount: "",
    cupon_title: "",
  });
  const navigate = useNavigate();
  function handleSubmit(event) {
    event.preventDefault();

    updateCupon(form).then(() =>{
      navigate("/cupones")
    }).catch((error) => {
      console.log(error);
      const newErrors = JSON.parse(error.message);
      setErrors({ ...errors, ...newErrors });
    });
  }

  function handleFormChange(event) {
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  }

  return (
    <Container>
      {form ? (
        <Form onSubmit={handleSubmit}>
          <Input
            id="name"
            label="Codigo"
            placeholder="domestic2020"
            type="text"
            value={form.name}
            onChange={handleFormChange}
            error={errors.name}
          />
          <Input
          id="end_date"
          label="Fecha limite"
          type="date"
          placeholder="dd-mm-yyyy"
          value={form.end_date}
          onChange={handleFormChange}
        />
          <Input
            id="discount"
            label="Descuento"
            placeholder="20"
            type="text"
            value={form.discount}
            onChange={handleFormChange}
            error={errors.discount}
          />
          <Input
            id="cupon_title"
            label="Titulo"
            placeholder="Aniversario"
            type="text"
            value={form.cupon_title}
            onChange={handleFormChange}
            error={errors.cupon_title}
          />

        <button class='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center' type="submit">
          Actualizar</button>
        </Form>
      ) : (
        <div>Cargando....</div>
      )}
    </Container>
  );
}


export default ModifyCupon;