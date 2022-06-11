import { useEffect, useState } from "react";
import { showCupon, updateCupon } from "../../services/cupon-service";
import { Form, Input } from "../../styles/views/Login";

function ModifyCupon(){
  
  const [form, setForm] = useState(null);
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id");
    
    showCupon(id).then((cupon) => {
      setForm({
        name: cupon.name,
        discount: cupon.discount,
        cupon_title: cupon.cupon_title,
      });
    });
  }, []);

  const [errors, setErrors] = useState({
    name: "",
    discount: "",
    cupon_title: "",
  });

  function handleSubmit(event) {
    event.preventDefault();

    updateCupon(form).catch((error) => {
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
    <>
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

          <button type="submit">Actualizar</button>
        </Form>
      ) : (
        <div>Cargando....</div>
      )}
    </>
  );
}


export default ModifyCupon;