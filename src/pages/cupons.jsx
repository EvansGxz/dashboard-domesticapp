import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { indexCupon } from "../services/cupon-service";

function Cupons(){
  const [cupons, setCupons] = useState(null);
  useEffect(()=>{
    indexCupon().then(setCupons)
  },[])
  const navigate = useNavigate();
  return(
    
    <>
     <button onClick={()=>navigate("/cupones/create_cupon")}>
      Crear Cupon
     </button>
    {
      cupons ? (
        <>
        <ContainerCupons >
          <ContainerListCupons>
          {
            cupons.map((cupon)=>(
              <div key={cupon.id}>
                
                  <Empty>
                    <InfoCupon>
                    <Tittle>{cupon.cupon_title}</Tittle>
                    <P>{cupon.discount + "% de descuento"}</P>
                    <P>Código: <span>{cupon.name}</span></P>
                    <P>Tiempo restante: {cupon.end_date}</P>
                    <Footer>
                    <NewLink to={`/cupones/modify_cupon/?id=${cupon.id}`}>
                      <PFooter>Modificar</PFooter>
                    </NewLink>
                    <NewLink to={`/cupones/delete_cupon/?id=${cupon.id}`}>
                      <PFooter>Eliminar</PFooter></NewLink>
                      <NewLink to={`/notify_cupon/?id=${cupon.id}`}>
                      <PFooter>Notificar</PFooter></NewLink>
                    </Footer>
                      </InfoCupon>
                    </Empty>
                  
              </div>
            ))}
            </ContainerListCupons>
          </ContainerCupons>
        </>
      ) : (
        <h2>No se encontraron cupones</h2>
      )
    }
    </>
  )

}

const ContainerCupons = styled.div`
  margin-top: 24px;
  padding: 0 30px 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Empty = styled.div`

`;
const ContainerListCupons = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, max-content));
  grid-gap: 25px;
  justify-content: center;
  padding: initial;
  width: 100%;
  
`;

export const NewLink = styled(Link)`
  text-decoration: none;
`;

const InfoCupon = styled.li`
  width: 25vw;
  border-radius: 20px;
  padding: 20px;
  grid-template-rows: 20px 1fr 24px;
  display: grid;
  border: 2px solid #ccc;
  max-width: 250px;
  `;

const P = styled.p`
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.25px;
  span {
    font-weight: bold;
    line-height: 24px;
  }
`;

const PFooter = styled.p`
  font-size: 12px;
  letter-spacing: 0.25px;
  color: black;
  padding: 8px;
`;

const Tittle = styled.p`
  font-weight: bold;
  font-size: 18px;
  line-height: 20px;
  
  letter-spacing: 0.25px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export default Cupons;