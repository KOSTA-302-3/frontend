import { ExclamationOutlined } from "@ant-design/icons";
import { Button } from "./ActionButton.styles";

const FeedBackButton = ({ onClick }) => {
  return (
    <div>
      <Button onClick={onClick}>
        <ExclamationOutlined />
      </Button>
    </div>
  );
};

export default FeedBackButton;
