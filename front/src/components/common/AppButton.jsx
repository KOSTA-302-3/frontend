import styled from "styled-components";
import { Button } from "antd";

const StyledButton = styled(Button)`
  width: 100%;
  height: 100%;
  border-radius: 4vh !important;
  font-size: 2.5vh;
  border: 0.2vh solid #e6c0c7 !important;
  background: none !important;
  color: #e6c0c7 !important;

  &:hover {
    border-color: #ffdaec !important;
    color: #ffdaec !important;
  }
`;

const AppButton = ({ children, ...rest }) => {
  return (
    <StyledButton {...rest}>
      {children}
    </StyledButton>
  );
};

export default AppButton;
