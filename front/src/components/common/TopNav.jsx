import { BellOutlined, MailOutlined } from "@ant-design/icons";
import { Wrapper, BackIcon, Title, IconGroup, HeaderIcon } from "./TopNav.styles";

export default function TopNav({ title, onBack, onNotification, onMessage }) {
  return (
    <Wrapper>
      {onBack && <BackIcon onClick={onBack} />}
      <Title>{title}</Title>
      <IconGroup>
        {onNotification && (
          <HeaderIcon onClick={onNotification}>
            <BellOutlined />
          </HeaderIcon>
        )}
        {onMessage && (
          <HeaderIcon onClick={onMessage}>
            <MailOutlined />
          </HeaderIcon>
        )}
      </IconGroup>
    </Wrapper>
  );
}
