import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { Navegador } from "../components/Navegador";
import { Sidebar } from "../components/Sidebar";
import { indexReport } from "../services/report-services";
import { Popdiv } from "./pop";

export const Reportes = () => {
  useEffect(() => {
    indexReport().then(setReports)
  },[])
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [reports, setReports] = useState(null);
  const togglePopup = (img) => {
    setIsOpen(!isOpen);
    setImage(img);
  }
  return (
    <>
     
     {
      isOpen && <Popdiv
      content={<>
      <Box>
      <Title>Evidencia Adjunta</Title></Box>
      {image ? (<img alt="reporte" src={image}/>) : <P>No hay archivos adjuntos</P>}
      
      </>}
      handleClose={togglePopup}
    />
    }
      <Sidebar></Sidebar>
      <div class="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <Navegador titulo="Reportes"></Navegador>
        <div class="px-6 pt-6 2xl:container">
          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          
            {
              reports ? (
                <>
                  {
                    reports.map((reporte, index)=>(
                      <div key={index}>
                  <div class="lg:h-full px-6 text-gray-600 rounded-xl border border-gray-200 bg-white">
                    <div class="mt-4">
                      <div class="mt-2 flex justify-center gap-4">
                        <h3 class="text-3xl font-bold text-gray-700">
                          {reporte.customer_name}
                        </h3>
                      </div>
                      <h5 class="text-base text-gray-700 text-center">
                        {reporte.body}
                      </h5>
                      <div class="mt-2 mb-4 flex justify-center gap-4">
                        <span class="block text-center text-gray-500">
                          {reporte.created_at.substr(0, 10)}
                        </span>
                        <br />
                        <span class="block text-center text-gray-500">
                          {reporte.employee_name}
                        </span>
                      </div>
                      <Button onClick={()=>togglePopup(reporte.image_url)}>Multimedia</Button>
                    </div>
                  </div>
                </div>
                    ))
                  }
                </>
              ) : <p>No hay reportes</p>
            }
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

const Title = styled.p`
  text-align: center;
  margin: 1rem 0;
  font-size: 2rem;
  
`;
const P = styled.p`
  margin: 0.225rem 0;
  font-size: 1rem;
`;