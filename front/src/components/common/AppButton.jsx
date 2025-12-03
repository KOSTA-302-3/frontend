import { Button } from "antd";
import "./AppButton.css";

const AppButton = ({ children, ...rest }) => {
  return (
    <Button className="app-button" {...rest}>
      {children}
    </Button>
  );
};

export default AppButton;
