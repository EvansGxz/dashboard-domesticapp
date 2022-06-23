import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { Navegador } from "../components/Navegador";
import { PopAll } from "../components/popAll";
import { Sidebar } from "../components/Sidebar";
import { deleteCupon, indexCupon } from "../services/cupon-service";
import CreateCupon from "./Cupons/createCupon";
import ModifyCupon from "./Cupons/modifyCupon";

const Cupones = () => {
  const [cupons, setCupons] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [cusId, setCusId] = useState(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    indexCupon().then(setCupons);
  }, []);
  function handleDelete(id) {
    deleteCupon(id).then(() => {
      indexCupon().then(setCupons)
    }).catch(() =>  console.log("No se puede borrar"));
  }

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  function toggleEdit(id) {
    setShow(!show);
  }

  function onEdit(id) {
    setCusId(id);
    toggleEdit();
  }

  function handleModalCreateChange(newValue) {
    setIsOpen(newValue)
  }

  function handleModalEditChange(newShow) {
    setShow(newShow)
    localStorage.removeItem('CupID');
  }

  function handleEmployeesEditChange(newCustomer) {
    setCupons(newCustomer)
  }

  if(cusId){
    localStorage.setItem("CupID", cusId);
  }
  return (
    <>
      {isOpen && (
        <PopAll
          content={
            <>
              <Box>
                <Title>CREAR CUPON</Title>
              </Box>
              <CreateCupon onInputChange={handleModalCreateChange} onStateChange={handleEmployeesEditChange}/>
            </>
          }
          handleClose={togglePopup}
        />
      )}
      {show && (
        <PopAll
          content={
            <>
              <Box>
                <Title>EDITAR CUPON</Title>
              </Box>
              {cusId ? (
                <>
                  <ModifyCupon onStateChange={handleEmployeesEditChange} onInputChange={handleModalEditChange} />
                </>
              ) : null}
            </>
          }
          handleClose={toggleEdit}
        />
      )}
      <Sidebar></Sidebar>
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <Navegador titulo="Cupones"></Navegador>
        <div className="px-6 pt-6 2xl:container">
          <div className="grid gap-6">
            <div className="max-w-2xl mx-auto bg-white p-8 lg:w-[100%]">
              <div className="">
                <div className="">
                  <div className="ml-60 flex justify-center gap-4">
                    <h3 className="text-3xl font-bold text-gray-700">
                      Cupones
                    </h3>
                    <Button onClick={()=>togglePopup()}>Crear Cupón</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {cupons ? (
              <>
                {cupons.map((cupon) => {
                  return (
                    <div className="lg:h-full py-8 px-6 rounded-xl border border-gray-300 bg-white">
                      <div className="mt-10">
                        <h5 className="text-xl text-gray-700 text-center">
                          Fecha limite: {cupon.end_date}
                        </h5>
                        <div className="mt-2 flex justify-center gap-4">
                          <h3 className="text-2xl font-bold text-gray-700">
                            {cupon.name}
                          </h3>
                        </div>

                        <div className="mt-2 flex justify-center gap-4">
                          <div onClick={()=>onEdit(cupon.id)}>
                            <button className="block text-xs text-center text-gray-500 hover:text-cyan-400">
                              MODIFICAR
                            </button>
                          </div>
                          <br />
                          <button
                            onClick={() => handleDelete(cupon.id)}
                            className="block text-xs text-center text-gray-500 hover:text-cyan-400"
                          >
                            ELIMINAR
                          </button>
                          <br />
                          <button className="block text-center text-xs text-gray-500 hover:text-cyan-400">
                            NOTIFICAR
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : null}
            <div onClick={()=>togglePopup()}>
                <div className="lg:h-full py-11 px-6 text-gray-600 rounded-xl border border-gray-200 bg-gradient-to-r from-sky-600 to-cyan-400  hover:text-white">
                  <div className="mt-6 mt-2 flex justify-center gap-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-14 w-14"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const Title = styled.p`
  text-align: center;
  margin: 1rem 0;
  font-size: 2rem;
`;
export const P = styled.p`
  margin: 0.225rem 0;
  font-size: 1rem;
`;

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

export const Box = styled.div`
  width: 100%;
  color: #fff;
  background-color: #0bbbef;
`;
export const Container = styled.div`
  width: 100%;
  padding: 20px;
`;
export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 1rem auto;
  padding: 20px;
`;

export default Cupones;
