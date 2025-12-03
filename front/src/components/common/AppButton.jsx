import { StyledButton } from "./AppButton.styles";

const AppButton = ({ children, ...rest }) => {
  return (
    <StyledButton {...rest}>
      {children}
    </StyledButton>
  );
};

export default AppButton;
