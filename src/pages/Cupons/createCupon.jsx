import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { createCupon, indexCupon } from "../../services/cupon-service";
import { createCuponUser } from "../../services/cupons-services";
import { indexCustomer } from "../../services/customer-services";
import { Input } from "../../styles/views/Login";

const StyledForm = styled.form`
  display: flex;
  flex-direction: initial;
  gap: 2rem;
  min-width: 10vw;
`;

const Container = styled.div`
  margin: 5%;
  justify-content: space-between;
  align-content: center;
  float: inline-start;
  width: 30%
`;
function CreateCupon({onInputChange, onStateChange}){
  const [users, setUsers] = useState();
  const [customer, setCustomer] = useState()
  const [type, setType] = useState(null);
  const [form, setForm] = useState({
    name: "",
    end_date: "",
    discount: "",
    cupon_title: "",
  });

  useEffect(() => {
    indexCustomer().then(setUsers)
  }, [])

  function handleFormChange(event) {
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    createCupon(form).then((cupon)=>{
      if(type === 'Individual'){
        createCuponUser({cupon_id: cupon.id, customer_id: customer})
      }
      onInputChange(false)
      indexCupon().then(onStateChange)
    })
      
  }

  return (
<>
    
    {
      users ? (
        <>
  <StyledForm onSubmit={handleSubmit}>
  <Container>
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
          id="count"
          label="Usos"
          type="number"
          placeholder="15"
          value={form.count}
          onChange={handleFormChange}
        />

        </Container>
        <Container>

        <Input
          id="end_date"
          label="Fecha limite"
          type="date"
          placeholder="dd-mm-yyyy"
          value={form.end_date}
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
        <StyleSelect id="cuponType" name="cuponType" onChange={(e)=>setType(e.target.value)}>
          <option value="">--Tipo de cup??n--</option>
          <option value="Global">Global</option>
          <option value="Individual">Individual</option>
        </StyleSelect>
        {
          type === 'Individual' ? (
            <>
              <StyleSelect id="user" name="customer_id" onChange={(e)=>setCustomer(e.target.value)}>
          <option value="">--Seleccione Cliente--</option>
          {
            users.map((user) =>(
              <option value={user.customer.id}>{user.customer.full_name}</option>
            ))
          }
        </StyleSelect>
            </>
          ) : null
        }
        
        <button class='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center' type="submit">
          Crear Cup??n
        </button>
      </Container>  
      </StyledForm>
        </>
      ) : null
    }
    
    
    </>
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
export default CreateCupon;