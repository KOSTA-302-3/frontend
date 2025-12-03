import { CommentOutlined } from "@ant-design/icons";
import "./ActionButton.css";

const CommentButton = ({ onClick }) => {
  return (
    <div className="action-button" onClick={onClick}>
      <CommentOutlined />
    </div>
  );
};

export default CommentButton;
