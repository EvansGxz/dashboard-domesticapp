import styled from "@emotion/styled";

export const Popdiv = props => {
  return (
    <div className="popup-box">
      <Box>
        <span className="close-icon" onClick={props.handleClose}>x</span>
        {props.content}
      </Box>
    </div>
  );
};
 
export const Box = styled.div`
  position: relative;
  width: 40%;
  margin: 0 auto;
  height: auto;
  max-height: 70vh;
  margin-top: calc(100vh - 85vh - 20px);
  background: #fff;
  border-radius: 4px;
  border: 1px solid #999;
  overflow: auto;
`;
