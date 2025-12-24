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
import { useCallback, useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

export default function TopNav({ title, onBack, onNotification, onMessage }) {
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchUnreadCount = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/api/notification/count", {
        withCredentials: true,
      });

      setUnreadCount(res.data);
      console.log("Fetched unread notification count:", res.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    // 컴포넌트 마운트 시 즉시 1회 호출
    fetchUnreadCount();

    // 일단 현재는 주석 처리
    //   const intervalId = setInterval(() => {
    //     fetchUnreadCount();
    //   }, 10000);
    //   return () => {
    //     clearInterval(intervalId);
    //   };
  }, [fetchUnreadCount]);

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
