import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NotificationList from "../../components/common/NotificationList";
import * as S from "./Notification.Style";
import { fetchNotifications, markRead, markAllRead } from "../../store/thunks/notificationThunks";
import { useDispatch, useSelector } from "react-redux";
const { PageWrap, TopBar, BackButton, Title, Spacer, LinkButton, PrimaryButton } = S;

export default function Notification() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1); // 페이지네이션용 (미구현)

  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notification.items);
  const unreadCount = useSelector((state) => state.notification.unreadCount);

  function goBack() {
    navigate(-1);
  }

  useEffect(() => {
    dispatch(fetchNotifications(1));
  }, [dispatch]);

  function handleMarkRead(id) {
    dispatch(markRead(id));
  }

  function handleMarkAllRead() {
    dispatch(markAllRead());
  }

  const loadingList = useSelector((state) => state.notification.loadingList);
  const markingAll = useSelector((state) => state.notification.markingAll);

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
          disabled={markingAll || loadingList || unreadCount === 0}
          aria-label="모두 읽음 처리"
        >
          {markingAll ? "모두 읽음 처리중..." : `모두 읽음${unreadCount > 0 ? ` (${unreadCount})` : ""}`}
        </PrimaryButton>
      </TopBar>

      <NotificationList notifications={notifications} onMarkRead={handleMarkRead} />
    </PageWrap>
  );
}
