import { ShareAltOutlined } from "@ant-design/icons";
import "./ActionButton.css";

const ShareButton = ({ onClick }) => {
  return (
    <div className="action-button" onClick={onClick}>
      <ShareAltOutlined />
    </div>
  );
};

export default ShareButton;
