import React, { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NotificationList from "../../components/common/NotificationList";
import * as S from "./Notification.Style";
import axiosInstance from "../../api/axiosInstance";
const { PageWrap, TopBar, BackButton, Title, Spacer, LinkButton, PrimaryButton } = S;

export default function Notification() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = React.useState([]);
  const [loadingAll, setLoadingAll] = React.useState(false);
  const [markingIds, setMarkingIds] = React.useState(new Set()); // 읽음 처리 중인 id들
  const [markingAll, setMarkingAll] = React.useState(false);
  const [page, setPage] = useState(1); // 페이지네이션용 (미구현)

  function goBack() {
    navigate(-1);
  }

  useEffect(() => {
    fetchAllNotifications();
  }, [page]);

  async function fetchAllNotifications() {
    setLoadingAll(true);
    try {
      const res = await axiosInstance.get("/api/notification/" + page, {
        withCredentials: true,
      });
      // 서버에서 [{id, title, message, time, isUnread}, ...] 형태로 반환된다고 가정
      if (Array.isArray(res.data.content)) {
        console.log("Fetched notifications:", res.data.content);
        setNotifications(res.data.content);
      } else {
        console.warn("notifications API returned unexpected shape", res.data);
      }
    } catch (err) {
      console.error(err);
      alert("전체 알림을 불러오지 못했습니다.");
    } finally {
      setLoadingAll(false);
    }
  }

  async function handleMarkRead(id) {
    setMarkingIds(true);
    try {
      await axiosInstance.delete(`/api/notification/${id}`, {
        withCredentials: true,
      });
      // 성공 시 db데이터 가져옴
      await fetchAllNotifications();
    } catch (err) {
      console.error(err);
      alert("읽음 처리에 실패했습니다.");
    } finally {
      setMarkingIds(false);
    }
  }

  async function handleMarkAllRead() {
    setMarkingAll(true);
    try {
      await axiosInstance.delete(`/api/notification`, {
        withCredentials: true,
      });
      // 성공 시 db데이터 가져옴
      await fetchAllNotifications();
    } catch (err) {
      console.error(err);
      alert("읽음 처리에 실패했습니다.");
    } finally {
      setMarkingAll(false);
    }
  }
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <PageWrap>
      <TopBar>
        <BackButton onClick={goBack} aria-label="뒤로가기">
          ←
        </BackButton>
        <Title>알림</Title>
        <Spacer />
        <PrimaryButton
          onClick={handleMarkAllRead}
          disabled={markingAll || loadingAll || unreadCount === 0}
          aria-label="모두 읽음 처리"
        >
          {markingAll ? "모두 읽음 처리중..." : `모두 읽음${unreadCount > 0 ? ` (${unreadCount})` : ""}`}
        </PrimaryButton>
      </TopBar>

      <NotificationList notifications={notifications} onMarkRead={handleMarkRead} />
    </PageWrap>
  );
}
