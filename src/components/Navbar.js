import styled from "@emotion/styled";
import Logo2 from "../assets/img/Logo2.png"
function NavBar(){

  return(
    <>
      <NavContainer>
        <NavTitleContainer>
          <NavImgContainer>
            <NavLogo src={Logo2}/>
          </NavImgContainer>
          <NavTitleTextContainer>
            <NavTitle>Hola</NavTitle>
          </NavTitleTextContainer>
        </NavTitleContainer>
      </NavContainer>
    </>
  )
}

export const NavContainer = styled.div`
  position: relative;
  width: 30vw;
  height: 100vh;
  background: linear-gradient(to bottom right, #dbe9fd, #fee4e6);
`;

export const NavTitleTextContainer = styled.div`
  position: relative;
  width: 20vw;
  float: left;
  text-align: center;
  align-self: center;
`;

export const NavImgContainer = styled.div`
  position: relative;
  float: left;
  width: 10vw;
`;

export const NavTitleContainer = styled.div`
  position: relative;
  width: 30vw;
  display: flex;
  background: white;
  justify-content: center;
  
`;

export const NavLogo = styled.img`
  height: 80%;
  justify-content: center;
`;

export const NavTitle = styled.span`
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 1.75rem;
`;

export const NavImageContainer = styled.div`
  position: relative;
  width: 30vw;
  display: flex;
  background: white;
  justify-content: center;
  
`;

export default NavBar;