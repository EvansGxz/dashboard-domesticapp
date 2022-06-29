import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { indexCategories } from "../../services/categories-services";
import { indexEmployee } from "../../services/employee-service";
import { indexCustomer } from "../../services/customer-services";
import { createOrder, indexOrder } from "../../services/order-details-services";
import { Input, Selected, Timer } from "../../styles/views/Login";

const ContainerAll = styled.div`
  
  {window.screen.width < 810 ? (margin: 1% 6%;):()}
`;
const StyledForm = styled.form`
  gap: 2rem;
  min-width: 258px;
  display: flex;
  flex-direction: initial;
`;

const Container = styled.div`
  margin: 2% 5%;
  justify-content: space-between;
  align-content: center;
  float: inline-start;
  {window.screen.width < 810 ? (width: 100%):(width: 30%)}
`;

export default function CrearOrder({ onInputChange, onStateChange }) {
  const [categories, setCategories] = useState(null);
  const [employess, setEmployees] = useState(null);
  const [isCurrent, setIsCurrent] = useState(null);
  const [customer, setCustomers] = useState(null);
  const [frecuencia, setFecuencia] = useState(null);
  const [veces, setVeces] = useState(null);
  const [order, setOrder] = useState(null);
  const [isDate, setisDate] = useState(null);
  const [form, setForm] = useState({
    category_id: "",
    employee_id: "",
    customer_id: "",
    address: "",
    start_date: "",
    workday: "",
    discount: "",
    supply_food: "",
    service_time: "",
    finish_date: "",
  });
  const [isTime, setIsTime] = useState();
  const [isWorkday, setIsWorkday] = useState();
  useEffect(() => {
    indexCategories().then(setCategories);
    indexEmployee().then(setEmployees);
    indexCustomer().then(setCustomers);
    indexOrder().then(setOrder);
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    if (isDate && veces && frecuencia) {
      const calc = isDate.split("-").join("/");
      const now = new Date(calc);
      const last = new Date(now);
  
      //console.log(new Date().getDate())
      //console.log(now.getUTCDay())
      let dia = 0;
    if (frecuencia === "1") {
      for (let j = 0; j < veces; j++) {
        last.setDate(last.getDate() + dia);
       
        dia= 1;
        const res =
          last.getFullYear() + "-" + (last.getMonth()+1) + "-" + last.getDate();
          createOrder({
            category_id: form.category_id,
            employee_id: form.employee_id,
            customer_id: form.customer_id,
            address: form.address,
            start_date: res,
            workday: event.target.workday.value,
            discount: form.discount,
            supply_food: form.supply_food,
            service_time: isTime,
          }).then(() => {
            onInputChange(false);
            indexOrder().then(onStateChange);
          })
         
      }
    }
    let semana = 0;
    if (frecuencia === "2") {
      for (let j = 0; j < veces; j++) {
        last.setDate(last.getDate() + semana);
        for (let i = 0; i < 7; i++) {
          if (now.getDay() !== last.getDay()) {
            if (last.getDay() > now.getDay()) {
              last.setHours(-24);
              //console.log("BAJA"+last);
            }
            if (last.getDay() < now.getDay()) {
              last.setHours(+24);
              //console.log("SUBE:"+last);
            }
          } else {
            i = 7;
          }
        }
        semana= 7;
        const res =
          last.getFullYear() + "-" + (last.getMonth()+1) + "-" + last.getDate();
          createOrder({
            category_id: form.category_id,
            employee_id: form.employee_id,
            customer_id: form.customer_id,
            address: form.address,
            start_date: res,
            workday: event.target.workday.value,
            discount: form.discount,
            supply_food: form.supply_food,
            service_time: isTime,
          }).then(() => {
            onInputChange(false);
            indexOrder().then(onStateChange);
          })
         
      }
    }
    let quincena = 0;
    if (frecuencia === "3") {
      for (let j = 0; j < veces; j++) {
        last.setDate(last.getDate() + quincena);
        for (let i = 0; i < 7; i++) {
          if (now.getDay() !== last.getDay()) {
            if (last.getDay() > now.getDay()) {
              last.setHours(-24);
              //console.log("BAJA"+last);
            }
            if (last.getDay() < now.getDay()) {
              last.setHours(+24);
              //console.log("SUBE:"+last);
            }
          } else {
            i = 7;
          }
        }
        quincena= 15;
        const res =
          last.getFullYear() + "-" + (last.getMonth()+1) + "-" + last.getDate();
          createOrder({
            category_id: form.category_id,
            employee_id: form.employee_id,
            customer_id: form.customer_id,
            address: form.address,
            start_date: res,
            workday: event.target.workday.value,
            discount: form.discount,
            supply_food: form.supply_food,
            service_time: isTime,
          }).then(() => {
            onInputChange(false);
            indexOrder().then(onStateChange);
          })
         
      }
    }
      let mes = 0;
      if (frecuencia === "4") {
        for (let j = 0; j < veces; j++) {
          console.log(new Date(last.setMonth(last.getMonth() + parseInt(mes))));
          for (let i = 0; i < 7; i++) {
            if (now.getDay() !== last.getDay()) {
              if (last.getDay() > now.getDay()) {
                last.setHours(-24);
                //console.log("BAJA"+last);
              }
              if (last.getDay() < now.getDay()) {
                last.setHours(+24);
                //console.log("SUBE:"+last);
              }
            } else {
              i = 7;
            }
          }
          const res =
            last.getFullYear() + "-" + (last.getMonth()+1) + "-" + last.getDate();
            mes=1;
            createOrder({
              category_id: form.category_id,
              employee_id: form.employee_id,
              customer_id: form.customer_id,
              address: form.address,
              start_date: res,
              workday: event.target.workday.value,
              discount: form.discount,
              supply_food: form.supply_food,
              service_time: isTime,
            }).then(() => {
              onInputChange(false);
              indexOrder().then(onStateChange);
            })
        }
      }
    }else{

    createOrder({
      category_id: form.category_id,
      employee_id: form.employee_id,
      customer_id: form.customer_id,
      address: form.address,
      start_date: event.target.start_date.value,
      workday: event.target.workday.value,
      discount: form.discount,
      supply_food: form.supply_food,
      service_time: isTime,
    }).then(() => {
      onInputChange(false);
      indexOrder().then(onStateChange);
    });}
  }

  function handleFormChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
    if (name === "workday") {
      setIsWorkday(event.target.value);
    }
  }

  function handleCalendarChange(event) {
    event.preventDefault();

    setisDate(event.target.value);
  }
  let freeEmp = [];
  if (order && isDate && employess && isTime && isWorkday) {
    console.log(parseInt(isTime.split(":").join("")));
    order.forEach((o) => {
      if (o.start_date === isDate) {
        employess.forEach((employee) => {
          if (employee.employee.id !== o.employee.id) {
            freeEmp.push({ employee: employee });
          }
          if (
            employee.employee.id === o.employee.id &&
            o.workday === "Media" &&
            isWorkday === "Media"
          ) {
            if (
              parseInt(isTime.split(":").join("")) >=
              parseInt(o.service_time.split(":").join("")) + 500
            ) {
              freeEmp.push({ employee: employee });
            } else if (
              parseInt(isTime.split(":").join("")) + 500 <=
              parseInt(o.service_time.split(":").join(""))
            ) {
              freeEmp.push({ employee: employee });
            }
          }
        });
      }
    });
  }
if(isTime){console.log(isTime)}
  return (
    <ContainerAll>
      {form ? (
        <>
          <StyledForm onSubmit={(e) => handleSubmit(e)}>
          {window.screen.width < 810 ? (
            <>
            <Container>
              <Selected
                id="category_id"
                label="Servicios"
                name="category_id"
                onChange={handleFormChange}
              >
                <option value="">--selecciona servicio--</option>
                {categories
                  ? categories.map((category) => (
                      <>
                        <option value={category.id}>
                          {category.region.substring(0, 3) +
                            " | " +
                            category.category_name}
                        </option>
                      </>
                    ))
                  : null}
              </Selected>
              <Input
                id="start_date"
                label="Fecha de inicio"
                type="date"
                placeholder="03-04-2022"
                onChange={handleCalendarChange}
              />
              <Timer label="Hora" onChange={setIsTime} value={form.service_time} />

              <Selected
                id="customer_id"
                label="Clientes"
                name="customer_id"
                onChange={handleFormChange}
              >
                <option value="">--selecciona cliente--</option>
                {customer
                  ? customer.map((category) => (
                      <>
                        <option value={category.customer.id}>
                          {category.customer.full_name}
                        </option>
                      </>
                    ))
                  : null}
              </Selected>
              <Input
                id="address"
                label="Dirección"
                type="text"
                placeholder="1"
                value={form.address}
                onChange={handleFormChange}
              />
           
              <Selected
                id="workday"
                label="Tipo de jornada"
                name="workday"
                onChange={handleFormChange}
              >
                <option value="">--tipo de jornada--</option>
                <option value="Completa">Completa | COL</option>
                <option value="Media">Media | COL</option>
                <option value="Hora">Hora | EU</option>
              </Selected>
              <Input
                id="discount"
                label="Descuento"
                type="number"
                placeholder="10"
                value={form.discount}
                onChange={handleFormChange}
              />
              <Selected
                id="supply_food"
                label="Suministrar Alimentos"
                name="supply_food"
                onChange={handleFormChange}
              >
                <option value="">--suministrar alimento--</option>
                <option value="Si">Si</option>
                <option value="No">No</option>
              </Selected>
              <Selected
                id="employee_id"
                label="Empleados"
                name="employee_id"
                onChange={handleFormChange}
              >
                <option value="">--selecciona empleado--</option>
                {freeEmp.length !== 0
                  ? freeEmp.map((employee) => (
                      <>
                        <option value={employee.employee.employee.id}>
                          {employee.employee.employee.full_name}
                        </option>
                      </>
                    ))
                  : employess
                  ? employess.map((employee) => (
                      <>
                        <option value={employee.employee.id}>
                          {employee.employee.full_name}
                        </option>
                      </>
                    ))
                  : null}
              </Selected>

              
           
              <Selected
                id="recurrente"
                label="Servicio recurrente"
                onChange={(e) => setIsCurrent(e.target.value)}
              >
                <option value="">--Servicio Recurrente--</option>
                <option value="1">Sí</option>
                <option value="2">No</option>
              </Selected>

              {isCurrent === "1" ? (
                <>
                  <Selected
                    id="recurrente"
                    label="Frecuencia"
                    onChange={(e) => setFecuencia(e.target.value)}
                  >
                    <option value="">Seleccionar frecuencia</option>
                    <option value="1">Diario(cada x días)</option>
                    <option value="2">Semanal(cada x a repetir)</option>
                    <option value="3">Quincenal(cada x a repetir)</option>
                    <option value="4">Mensual(cada x a repetir)</option>
                  </Selected>
                  <Input
                    id="frecuencia"
                    label="Cantidad de veces"
                    type="number"
                    placeholder="4"
                    onChange={(e) => setVeces(e.target.value)}
                  />
                </>
              ) : null}

              {
                isWorkday==="Hora" ? (
                  <>
                <Input
                id="hours"
                label="Cantidad de Horas"
                type="number"
                placeholder="3"
                value={form.finish_date}
                onChange={handleFormChange}
              />
                </>) : null
              }
              <button
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl w-full md:w-auto px-5 py-2.5 text-center"
                type="submit"
              >
                Crear Servicio
              </button>
            </Container>
            </>
          ):(
            <>
            <Container>
              <Selected
                id="category_id"
                label="Servicios"
                name="category_id"
                onChange={handleFormChange}
              >
                <option value="">--selecciona servicio--</option>
                {categories
                  ? categories.map((category) => (
                      <>
                        <option value={category.id}>
                          {category.region.substring(0, 3) +
                            " | " +
                            category.category_name}
                        </option>
                      </>
                    ))
                  : null}
              </Selected>
              <Input
                id="start_date"
                label="Fecha de inicio"
                type="date"
                placeholder="03-04-2022"
                onChange={handleCalendarChange}
              />
              <Timer label="Hora" onChange={setIsTime} value={form.service_time} />

              <Selected
                id="customer_id"
                label="Clientes"
                name="customer_id"
                onChange={handleFormChange}
              >
                <option value="">--selecciona cliente--</option>
                {customer
                  ? customer.map((category) => (
                      <>
                        <option value={category.customer.id}>
                          {category.customer.full_name}
                        </option>
                      </>
                    ))
                  : null}
              </Selected>
              <Input
                id="address"
                label="Dirección"
                type="text"
                placeholder="1"
                value={form.address}
                onChange={handleFormChange}
              />
            </Container>
            <Container>
              <Selected
                id="workday"
                label="Tipo de jornada"
                name="workday"
                onChange={handleFormChange}
              >
                <option value="">--tipo de jornada--</option>
                <option value="Completa">Completa | COL</option>
                <option value="Media">Media | COL</option>
                <option value="Hora">Hora | EU</option>
              </Selected>
              <Input
                id="discount"
                label="Descuento"
                type="number"
                placeholder="10"
                value={form.discount}
                onChange={handleFormChange}
              />
              <Selected
                id="supply_food"
                label="Suministrar Alimentos"
                name="supply_food"
                onChange={handleFormChange}
              >
                <option value="">--suministrar alimento--</option>
                <option value="Si">Si</option>
                <option value="No">No</option>
              </Selected>
              <Selected
                id="employee_id"
                label="Empleados"
                name="employee_id"
                onChange={handleFormChange}
              >
                <option value="">--selecciona empleado--</option>
                {freeEmp.length !== 0
                  ? freeEmp.map((employee) => (
                      <>
                        <option value={employee.employee.employee.id}>
                          {employee.employee.employee.full_name}
                        </option>
                      </>
                    ))
                  : employess
                  ? employess.map((employee) => (
                      <>
                        <option value={employee.employee.id}>
                          {employee.employee.full_name}
                        </option>
                      </>
                    ))
                  : null}
              </Selected>

              <button
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl w-full md:w-auto px-5 py-2.5 text-center"
                type="submit"
              >
                Crear Servicio
              </button>
            </Container>
            <Container>
              <Selected
                id="recurrente"
                label="Servicio recurrente"
                onChange={(e) => setIsCurrent(e.target.value)}
              >
                <option value="">--Servicio Recurrente--</option>
                <option value="1">Sí</option>
                <option value="2">No</option>
              </Selected>

              {isCurrent === "1" ? (
                <>
                  <Selected
                    id="recurrente"
                    label="Frecuencia"
                    onChange={(e) => setFecuencia(e.target.value)}
                  >
                    <option value="">Seleccionar frecuencia</option>
                    <option value="1">Diario(cada x días)</option>
                    <option value="2">Semanal(cada x a repetir)</option>
                    <option value="3">Quincenal(cada x a repetir)</option>
                    <option value="4">Mensual(cada x a repetir)</option>
                  </Selected>
                  <Input
                    id="frecuencia"
                    label="Cantidad de veces"
                    type="number"
                    placeholder="4"
                    onChange={(e) => setVeces(e.target.value)}
                  />
                </>
              ) : null}

              {
                isWorkday==="Hora" ? (
                  <>
                <Input
                id="hours"
                label="Cantidad de Horas"
                type="number"
                placeholder="3"
                value={form.finish_date}
                onChange={handleFormChange}
              />
                </>) : null
              }
            </Container>
            </>
          )}
           
          </StyledForm>
        </>
      ) : (
        <div>Cargando....</div>
      )}
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
