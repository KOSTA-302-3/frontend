import { ShareAltOutlined } from "@ant-design/icons";
import { Button } from "./ActionButton.styles";

const ShareButton = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <ShareAltOutlined />
    </Button>
  );
};

export default ShareButton;
