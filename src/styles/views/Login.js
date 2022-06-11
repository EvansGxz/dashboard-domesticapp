
import styled from "@emotion/styled";
import { azul, gris } from "../colors";

export const Title = styled.p`
  text-align: center;
  margin: 1rem 0;
  font-size: 3rem;
`;

export const Form = styled.form`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export const ContainerInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 1rem 0;
`;

export const Label = styled.label`
  color: ${gris};
`;

const Error = styled.p`
  color: red;
  padding-left: 1rem;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid ${gris};
  margin: 0.5rem 0;
`;

export const Input = ({
  id,
  name,
  type = "text",
  placeholder,
  label,
  error,
  innerRef,
  ...rest
}) => {
  name ||= id;
  return (
    <ContainerInput>
      {label && <Label htmlFor={id}>{label}</Label>}
      <StyledInput
        id={id}
        name={name}
        type={type}
        ref={innerRef}
        placeholder={placeholder}
        {...rest}
      />
      {error && <Error size="sm">{error}</Error>}
    </ContainerInput>
  );
};

export const ContainerInputImg = styled.div`
  position: relative;
  width: 60%;
  margin: 2rem auto;
  height: 20rem;
`;

export const Img = styled.img`
  border-radius: 50%;
  border: 3px solid ${azul};
  width: 100%;
  height: 100%;
`;

export const Round = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  overflow: hidden;
  border-radius: 50%;
  background-color: ${azul};
  height: 5rem;
  width: 5rem;
`;

export const InputImg = styled.input`
  width: 100%;
  height: 100%;
  opacity: 0;
  overflow: hidden;
`;
