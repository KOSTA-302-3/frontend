import {
  BellOutlined,
  MailOutlined,
  DownCircleOutlined,
} from "@ant-design/icons";
import {
  Wrapper,
  BackIcon,
  Title,
  IconGroup,
  HeaderIcon,
} from "./TopNav.styles";

import UserDropDown from "../../components/common/UserDropDwonMenu";

export default function TopNav({ title, onBack, onNotification, onMessage }) {
  return (
    <Wrapper>
      {onBack && <BackIcon onClick={onBack} />}
      <Title>{title}</Title>
      <IconGroup>
        <HeaderIcon>
          <UserDropDown />
        </HeaderIcon>
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
