import { BellOutlined, MailOutlined } from "@ant-design/icons";
import { Wrapper, BackIcon, Title, IconGroup, HeaderIcon } from "./TopNav.styles";
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

    // 10초마다 unread count polling
    const intervalId = setInterval(() => {
      fetchUnreadCount();
    }, 10000);
    return () => {
      clearInterval(intervalId);
    };
  }, [fetchUnreadCount]);

  return (
    <Wrapper>
      {onBack && <BackIcon onClick={onBack} />}
      <Title>{title}</Title>
      <IconGroup>
        <HeaderIcon>
          <UserDropDown />
        </HeaderIcon>

        {onNotification && (
          /* 변경:
             1) Badge 내부에 불필요한 <span> 제거 — 아이콘을 직접 자식으로 줌
             2) 아이콘에 스타일(fontSize 등)을 직접 줘서 크기 보장
             3) count가 0이면 null로 전달해서 뱃지를 숨김(기존 로직 유지)
          */
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
