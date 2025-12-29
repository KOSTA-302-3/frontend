import { BellOutlined, MailOutlined, GiftOutlined } from "@ant-design/icons";
import { Wrapper, BackIcon, Title, IconGroup, HeaderIcon } from "./TopNav.styles";
import { Badge } from "antd";
const wsNotificationIp = import.meta.env.VITE_WS_NOTIFICATION_IP || "";
import UserDropDown from "../../components/common/UserDropDwonMenu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchNewMessages,
  fetchUnreadCount,
} from "../../store/thunks/notificationThunks";
import { fetchMyInfo, fetchMyProfile } from "../../store/thunks/authThunks";
import {
  increaseNewMessage,
  increaseUnreadCount,
} from "../../store/slices/notificationSlice";
import { useNavigate } from "react-router-dom";
import { updateChatroom } from "../../store/slices/chatroomSlice";

export default function TopNav({ title, onBack, onNotification, onMessage, onTitle }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const unreadCount = useSelector((state) => state.notification.unreadCount);
  const newMessage = useSelector((state) => state.notification.newMessage);
  useEffect(() => {
    dispatch(fetchUnreadCount());
    dispatch(fetchNewMessages());
  }, [dispatch]);

  const userId = useSelector((state) => state.auth.userId);

  const protocol = window.location.protocol === "https:" ? "wss" : "ws";

  useEffect(() => {
    dispatch(fetchMyInfo());
    dispatch(fetchMyProfile());
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
      } else {
        dispatch(increaseNewMessage());
        dispatch(updateChatroom({ id: msg.chatroomId, hasUnread: true }));
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

      <Title onClick={onTitle} style={{ cursor: onTitle ? "pointer" : "default" }}>
        {title}
      </Title>

      <IconGroup>
        <HeaderIcon>
          <UserDropDown />
        </HeaderIcon>
        <HeaderIcon onClick={() => navigate("/shop")}>
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
            <Badge count={newMessage > 0 ? newMessage : null} size="small" overflowCount={99} offset={[0, 4]}></Badge>
          </HeaderIcon>
        )}
      </IconGroup>
    </Wrapper>
  );
}
