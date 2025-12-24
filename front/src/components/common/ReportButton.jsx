import { AlertOutlined } from "@ant-design/icons";
import { Button } from "./ActionButton.styles";
const ReportButton = ({ onClick }) => {
  return (
    <div>
      <Button onClick={onClick}>
        <AlertOutlined />
      </Button>
    </div>
  );
};

export default ReportButton;
