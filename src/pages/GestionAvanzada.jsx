import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { Navegador } from "../components/Navegador";
import { Sidebar } from "../components/Sidebar";
import { useAuth } from "../context/auth-context";
import { indexAdmin } from "../services/admin-services";
import {
  deleteCategory,
  indexCategories,
} from "../services/categories-services";
import { deleteUser } from "../services/users-service";
import CrearMod from "./Admins/createMod";
import EditMod from "./Admins/editMod";
import { Popdiv } from "./pop";
import CrearServicio from "./Servicios/crearServicio";
import EditarServicio from "./Servicios/editarServicio";

export const GestionAvanzada = () => {
  const [mods, setMod] = useState(null);
  const [mErrors, setMErrors] = useState(false);
  const { user } = useAuth();
  const [categories, setCategories] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [cusId, setCusId] = useState(null);
  const [servId, setservId] = useState(null);
  const [show, setShow] = useState(false);
  const [createServce, setCreateServce] = useState(false);
  const [editService, setEditService] = useState(false);

  useEffect(() => {
    indexCategories().then(setCategories);
  }, [setCategories]);

  function handleDelete(id) {
    deleteCategory(id)
      .then(() => {
        indexCategories().then(setCategories);
      })
      .catch(toggleErrors);
  }
  useEffect(() => {
    indexAdmin().then(setMod);
  }, [setMod]);

  function handleDeleteUser(id) {
    deleteUser(id).then(() => {
      indexAdmin().then(setMod);
    });
  }

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const toggleServi = () => {
    setCreateServce(!createServce);
  };

  function toggleEdit() {
    setShow(!show);
  }

  function toggleServEdit() {
    setEditService(!editService);
  }

  function toggleErrors() {
    setMErrors(!mErrors);
  }

  function onServEdit(id) {
    setservId(id);
    toggleServEdit();
  }

  function onEdit(id) {
    setCusId(id);
    toggleEdit();
  }

  function handleModalCreateUserChange(newValue) {
    setIsOpen(newValue);
  }

  function handleModalEditUserChange(newShow) {
    setShow(newShow);
    localStorage.removeItem("AdminID");
  }

  function handleFetchUser(newCustomer) {
    setMod(newCustomer);
  }

  if (cusId) {
    localStorage.setItem("AdminID", cusId);
  }

  //Services Handled

  function handleModalCreateServiceChange(newValue) {
    setCreateServce(newValue);
  }

  function handleModalEditServiceChange(newShow) {
    setEditService(newShow);
    localStorage.removeItem("AdminID");
  }

  function handleFetchService(newCustomer) {
    setCategories(newCustomer);
  }

  if (servId) {
    localStorage.setItem("ServID", servId);
  }
  return (
    <>
      {isOpen && (
        <Popdiv
          content={
            <>
              <Box>
                <Title>CREAR ADMINISTRADOR</Title>
              </Box>
              <CrearMod
                onInputChange={handleModalCreateUserChange}
                onStateChange={handleFetchUser}
              />
            </>
          }
          handleClose={togglePopup}
        />
      )}
      {show && (
        <Popdiv
          content={
            <>
              <Box>
                <Title>EDITAR ADMINISTRADOR</Title>
              </Box>
              {cusId ? (
                <>
                  <EditMod
                    onStateChange={handleFetchUser}
                    onInputChange={handleModalEditUserChange}
                  />
                </>
              ) : null}
            </>
          }
          handleClose={toggleEdit}
        />
      )}

      {/*SERVICIOS POPUP*/}

      {createServce && (
        <Popdiv
          content={
            <>
              <Box>
                <Title>CREAR SERVICIO</Title>
              </Box>
              <CrearServicio
                onInputChange={handleModalCreateServiceChange}
                onStateChange={handleFetchService}
              />
            </>
          }
          handleClose={toggleServi}
        />
      )}
      {editService && (
        <Popdiv
          content={
            <>
              <Box>
                <Title>EDITAR SERVICIO</Title>
              </Box>
              {servId ? (
                <>
                  <EditarServicio
                    onStateChange={handleFetchService}
                    onInputChange={handleModalEditServiceChange}
                  />
                </>
              ) : null}
            </>
          }
          handleClose={toggleServEdit}
        />
      )}
      {mErrors && (
        <Popdiv
          content={
            <>
              <BoxErr>
                <Title>No se puede ejecutar esta acción</Title>
              </BoxErr>
              <Container>
                <P>
                  Posibles motivos:
                  <UL>
                    <li>Existe un empleado con este servicio.</li>
                    <li>Existen tareas para este servicio.</li>
                    <li>Existe un servicio en curso con este servcio.</li>
                  </UL>
                </P>
                <br />
                <P>
                  Acciones:
                  <UL>
                    <li>Eliminar empleado/s con este servicio.</li>
                    <li>Modificar el servicio del empleado.</li>
                    <li>Eliminar las tareas de este servicio.</li>
                    <li>Modificar a que servicio se brindan las tareas.</li>
                    <li>Finalizar servicio en curso.</li>
                    <li>Modificar servicio del servicio en curso.</li>
                  </UL>
                </P>
              </Container>
            </>
          }
          handleClose={toggleErrors}
        />
      )}
      <Sidebar></Sidebar>
      <div class="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <Navegador titulo="Gestion Avanzada"></Navegador>
        <div className="px-6 2xl:container">
          <div className="grid gap-6">
            <div className="max-w-2xl mx-auto bg-white p-8 lg:w-[100%]">
              <div className="">
                <div className="">
                  <div className="ml-60 flex justify-center gap-4">
                    <h3 className="text-3xl font-bold text-gray-700">
                      Administradores
                    </h3>
                    {user.role === "spectator" ? null : (
                      <Button onClick={() => togglePopup()}>
                        Crear Administrador
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Tabla Servicios */}
          {mods ? (
            <>
              <table className="table-auto table text-white border-separate space-y-6 text-sm w-full border-collapse">
                <thead className="text-black">
                  <tr>
                    <th className="p-3 text-left">Imagen</th>
                    <th className="p-3 text-left">Nombre</th>
                    <th className="p-3 text-left">Correo</th>
                    <th className="p-3 text-left">Rol</th>
                    {user.role === "admin" ? (
                      <>
                        <th className="p-3 text-left">Acción</th>
                      </>
                    ) : null}
                  </tr>
                </thead>
                <tbody>
                  {mods.map((empleado, index) => {
                    return (
                      <tr key={index} className="bg-gray-100">
                        <td class="p-3 text-black">
                          <img
                            src={empleado.admin.image_url}
                            alt="category"
                            class="h-14 w-14 rounded-full"
                          />
                        </td>
                        <td className="p-3 text-black">
                          {empleado.admin.nickname}
                        </td>
                        <td className="p-3 text-black">
                          {empleado.admin.email}
                        </td>
                        {empleado.admin.role === "admin" ? (
                          <td className="p-3 text-black">Administrador</td>
                        ) : empleado.admin.role === "mod" ? (
                          <td className="p-3 text-black">Miembro del Equipo</td>
                        ) : (
                          <td className="p-3 text-black">Espectador</td>
                        )}

                        {user.role === "admin" ? (
                          <>
                            <td className="p-3 flex flex-row ">
                              <div
                                className="text-gray-600 hover:text-cyan-300"
                                onClick={() => onEdit(empleado.admin.user_id)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                  />
                                </svg>
                              </div>
                              <div
                                id={empleado.admin.user_id}
                                onClick={() =>
                                  handleDeleteUser(empleado.admin.user_id)
                                }
                                className="text-gray-600 hover:text-cyan-300 ml-4"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </div>
                            </td>
                          </>
                        ) : null}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          ) : (
            <h2>No se encontraron empleados</h2>
          )}
          {/* Crear Servicio */}
          <div className="grid gap-6">
            <div className="max-w-2xl mx-auto bg-white p-8 lg:w-[100%]">
              <div className="">
                <div className="">
                  <div className="ml-60 flex justify-center gap-4">
                    <h3 className="text-3xl font-bold text-gray-700">
                      Servicios
                    </h3>
                    {user.role === "spectator" ? null : (
                      <Button onClick={() => toggleServi()}>
                        Crear Servicio
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Tabla Servicios */}
          {categories ? (
            <>
              <table class="table-auto table text-white border-separate space-y-6 text-sm w-full border-collapse">
                <thead class="text-black">
                  <tr>
                    <th className="p-3 text-left">Imagen</th>
                    <th class="p-3 text-left">Categoria</th>
                    <th class="p-3 text-left">Servicio</th>
                    <th class="p-3 text-left">Jornada Completa</th>
                    <th class="p-3 text-left">Jornada Media</th>
                    <th class="p-3 text-left">Jornada Por Hora</th>
                    <th class="p-3 text-left">Region</th>
                    <th className="p-3 text-left">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category, index) => {
                    return (
                      <tr key={index} class="bg-gray-100">
                        <td class="p-3 text-black">
                          <img
                            src={category.image_url}
                            alt="category"
                            class="h-14 w-14 rounded-full"
                          />
                        </td>
                        <td class="p-3 text-black">{category.sector}</td>
                        <td class="p-3">
                          <div class="flex align-items-center">
                            <div class="ml-3">
                              <div class="text-black font-bold">
                                {category.category_name}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td class="p-3 text-black">
                          {category.price_col_complete} COP
                        </td>

                        <td class="p-3 text-black">
                          {category.price_col_half} COP
                        </td>

                        <td class="p-3 text-black">{category.price_spain} €</td>

                        <td class="p-3 text-black">{category.region}</td>
                        {user.role === "spectator" ? null : (
                          <>
                            <td className="p-3 flex flex-row">
                              <div
                                className="text-gray-600 hover:text-cyan-300"
                                onClick={() => onServEdit(category.id)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                  />
                                </svg>
                              </div>
                              <div
                                id={category.id}
                                onClick={() => handleDelete(category.id)}
                                className="text-gray-600 hover:text-cyan-300 ml-4"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </div>
                            </td>
                          </>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          ) : (
            <h2>No se encontraron Clientes</h2>
          )}
        </div>
      </div>
    </>
  );
};

const Button = styled.button`
  display: flex;
  width: "fit-content";
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background-color: #0bbbef;
  border-radius: 10px;
  color: #fff;
  border: none;
  margin: 1rem auto;
`;

const Box = styled.div`
  width: 100%;
  color: #fff;
  background-color: #0bbbef;
`;

const BoxErr = styled.div`
  width: 100%;
  color: #fff;
  background-color: #ec607e;
`;

const Title = styled.p`
  text-align: center;
  margin: 1rem 0;
  font-size: 2rem;
`;

export const P = styled.p`
  margin: 0.225rem 0;
  font-size: 1rem;
`;
export const Container = styled.div`
  width: 100%;
  padding: 20px;
`;

const UL = styled.ul`
  list-style: inherit;
  padding: 0 2rem;
`;
