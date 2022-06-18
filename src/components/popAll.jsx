import styled from "@emotion/styled";

export const PopAll = props => {
  return (
    <div className="popup-box">
      <Box>
        <Close className="close-icon" onClick={props.handleClose}>x</Close>
        {props.content}
      </Box>
    </div>
  );
};
 
export const Box = styled.div`
  position: relative;
  width: 80%;
  margin: 0 18%;
  height: auto;
  max-height: 70vh;
  margin-top: calc(100vh - 85vh - 20px);
  background: #fff;
  border-radius: 4px;
  border: 1px solid #999;
  overflow: auto;
`;

export const Close = styled.span`
  content: 'x';
  cursor: pointer;
  position: fixed;
  right: calc(20px);
  top: calc(100vh - 85vh - 33px);
  background: #ededed;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  line-height: 20px;
  text-align: center;
  border: 1px solid #999;
  font-size: 20px;
`;
