import { BellOutlined, MailOutlined, GiftOutlined } from "@ant-design/icons";
import {
  Wrapper,
  BackIcon,
  Title,
  IconGroup,
  HeaderIcon,
} from "./TopNav.styles";
import { Badge } from "antd";

import UserDropDown from "../../components/common/UserDropDwonMenu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUnreadCount } from "../../store/thunks/notificationThunks";

export default function TopNav({ title, onBack, onNotification, onMessage }) {
  const dispatch = useDispatch();
  const unreadCount = useSelector((state) => state.notification.unreadCount);

  useEffect(() => {
    dispatch(fetchUnreadCount());
  }, [dispatch]);

  return (
    <Wrapper>
      {onBack && <BackIcon onClick={onBack} />}
      <Title>{title}</Title>
      <IconGroup>
        <HeaderIcon>
          <UserDropDown />
        </HeaderIcon>
        <HeaderIcon>
          <GiftOutlined />
        </HeaderIcon>
        {onNotification && (
          <HeaderIcon onClick={onNotification}>
            <BellOutlined style={{ fontSize: "3.5vh", color: "inherit" }} />
            <Badge
              count={unreadCount > 0 ? unreadCount : null}
              size="small"
              overflowCount={99}
              offset={[0, 4]}
            ></Badge>
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
