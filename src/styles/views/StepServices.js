
import styled from "@emotion/styled";
import { gris } from "../colors";

export const ContainerInput = styled.div`
  width: 100%;
  margin-bottom: ${({ margin }) => `${margin}rem`};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const StyleSelect = styled.select`
  width: 90%;
  border: 1px solid ${gris};
  padding: 1.5rem 2rem;
  background-color: transparent;
  border-radius: 0.5rem;
  color: ${gris};
  margin: 1rem 0;
`;

export const StyleInput = styled.input`
  width: 90%;
  border: 1px solid ${gris};
  padding: 1.5rem 2rem;
  background-color: transparent;
  border-radius: 0.5rem;
  color: ${gris};
  margin: 1rem 0;
`;
export const P = styled.p`
  font-size: 2rem;
  font-weight: 500;
  color: ${({ color }) => (color === "gris" ? gris : "black")}; ;
`;
