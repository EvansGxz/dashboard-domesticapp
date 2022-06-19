import styled from "@emotion/styled";
import React, { useState } from "react";
import { Navegador } from "../components/Navegador";
import { Sidebar } from "../components/Sidebar";
import { reportes } from "../data/ReportesData";
import { Popdiv } from "./pop";

export const Reportes = () => {
  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  return (
    <>
     
     {
      isOpen && <Popdiv
      content={<>
      <Box>
      <Title>Evidencia Adjunta</Title></Box>
      <P>No hay archivos adjuntos</P>
      </>}
      handleClose={togglePopup}
    />
    }
      <Sidebar></Sidebar>
      <div class="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <Navegador titulo="Reportes"></Navegador>
        <div class="px-6 pt-6 2xl:container">
          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {reportes.map((reporte, index) => {
              return (
                <div key={index}>
                  <div class="lg:h-full px-6 text-gray-600 rounded-xl border border-gray-200 bg-white">
                    <div class="mt-4">
                      <div class="mt-2 flex justify-center gap-4">
                        <h3 class="text-3xl font-bold text-gray-700">
                          {reporte.nombre}
                        </h3>
                      </div>
                      <h5 class="text-base text-gray-700 text-center">
                        {reporte.desc}
                      </h5>
                      <div class="mt-2 mb-4 flex justify-center gap-4">
                        <span class="block text-center text-gray-500">
                          {reporte.fecha}
                        </span>
                        <br />
                        <span class="block text-center text-gray-500">
                          {reporte.telefono}
                        </span>
                      </div>
                      <Button onClick={()=>togglePopup()}>Multimedia</Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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
  background-color: #0BBBEF;
  border-radius: 10px;
  color: #FFF;
  border: none;
  margin: 1rem auto;
`;

const Box = styled.div`
  width: 100%;
  color: #FFF;
  background-color: #0BBBEF;
`;
const Container = styled.div`
  width: 100%;
  padding: 20px;
`;
const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 1rem auto;
  padding: 20px;
`;

const Title = styled.p`
  text-align: center;
  margin: 1rem 0;
  font-size: 2rem;
  
`;
const P = styled.p`
  margin: 0.225rem 0;
  font-size: 1rem;
`;