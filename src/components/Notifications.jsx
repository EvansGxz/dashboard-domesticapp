import styled from "@emotion/styled";
import React, { useEffect, useState } from "react"
import { useAuth } from "../context/auth-context";
import { deleteNotify, showNotify } from "../services/notiications-services"
import trash from "../assets/img/trash.svg";
import noti from "../assets/img/notifi.svg";

export function Notify(){
  const {user} = useAuth();
  const [isNotify, setIsNotify] = useState();
useEffect(() =>{
  showNotify(user.user_id).then(setIsNotify);
},[user])

function delNot(id){
  deleteNotify(id).then(()=>showNotify(user.user_id).then(setIsNotify))
}
  return(<ContainerAll>

    {isNotify ? (
      <ContainerNoti>
      {
        isNotify.map((not) =>(
          <SubContainer color={not.name === "Servicio Programado" ? ("blue"): not.name === "Servicio Cancelado" ? ("red"): not.name === "Servicio Reprogramado" ? ("yellow"): null}>
          <img src={noti} alt="icon-notification" />
          <Info>
          <h3>{not.name}</h3>
          <p>{not.body}</p>
          </Info>
          <Borrar>
          <span>{not.created_at.substr(0, 10)}</span>
          <Image src={trash} alt="icon-trash"  onClick={() =>delNot(not.id)}/>
          </Borrar>
        </SubContainer>))
      }
    </ContainerNoti>
    ) : <p>No hay notificaciones</p>}
  </ContainerAll>)
}

const ContainerNoti = styled.div`
 
  
  padding: 1rem;
  flex-direction: column;
`;

const Image = styled.img`
  cursor: pointer;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
 
  h3 {
    margin: 0.5rem 0;
    font-weight: bold;
  }
`;
const Borrar = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;

  span {
    color: gray;
  }
`;

function sizeStyles(color) {
  switch (color) {
    case "red":
      return `
      background-color: ${red};
      `;

    case "blue":
      return `
      background-color: ${blue};
        `;
        case "yellow":
          return `
          background-color: ${yellow};
            `;
    default:
      break;
  }
}
export const SubContainer = styled.div`
  
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  margin: 1rem auto;
  border-radius: 1rem;
  padding: 0 1rem;

  ${(props) => sizeStyles(props.color)}
`;

export const ContainerAll = styled.div`
  
`;

const red = "#ffcccb"
const blue = "#f0fcff"
const yellow = "#ffffd4"

