import { LeftOutlined, BellOutlined, MailOutlined } from "@ant-design/icons";
import "./TopNav.css";

export default function TopNav({ title, onBack, onNotification, onMessage }) {
  return (
    <div className="top-nav">
      {onBack && <LeftOutlined className="back-icon" onClick={onBack} />}
      <h1 className="title">{title}</h1>
      <div className="icon-group">
        {onNotification && (
          <div className="header-icon" onClick={onNotification}>
            <BellOutlined />
          </div>
        )}
        {onMessage && (
          <div className="header-icon" onClick={onMessage}>
            <MailOutlined />
          </div>
        )}
      </div>
    </div>
  );
}
