import { BellOutlined, MailOutlined, GiftOutlined } from "@ant-design/icons";
import { Wrapper, BackIcon, Title, IconGroup, HeaderIcon } from "./TopNav.styles";
import { Badge } from "antd";
const wsNotificationIp = import.meta.env.VITE_WS_NOTIFICATION_IP || "";
import UserDropDown from "../../components/common/UserDropDwonMenu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUnreadCount } from "../../store/thunks/notificationThunks";
import { fetchMyInfo } from "../../store/thunks/authThunks";
import { increaseUnreadCount } from "../../store/slices/notificationSlice";

export default function TopNav({ title, onBack, onNotification, onMessage }) {
  const dispatch = useDispatch();
  const unreadCount = useSelector((state) => state.notification.unreadCount);

  useEffect(() => {
    dispatch(fetchUnreadCount());
  }, [dispatch]);

  const userId = useSelector((state) => state.auth.userId);

  const protocol = window.location.protocol === "https:" ? "wss" : "ws";

  useEffect(() => {
    dispatch(fetchMyInfo());
  }, [dispatch]);

  useEffect(() => {
    if (userId == null) return;
    const socket = new WebSocket(`${protocol}${wsNotificationIp}`);
    socket.onopen = () => {
      console.log("Notification WS connected");
    };
    socket.onmessage = (event) => {
      console.log("Notification WS message received");
      const msg = event.data;
      console.log("Notification WS message content:", msg);
      if (msg === "Notification") {
        dispatch(increaseUnreadCount());
      }
    };

    socket.onerror = (e) => {
      console.error("WebSocket error", e);
    };
    socket.onclose = () => {
      console.log("Notification WS disconnected");
    };
    return () => {
      socket.close();
    };
  }, [dispatch, userId]);

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
            <Badge count={unreadCount > 0 ? unreadCount : null} size="small" overflowCount={99} offset={[0, 4]}></Badge>
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
