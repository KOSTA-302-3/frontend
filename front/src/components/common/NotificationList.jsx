import React from "react";
import NotificationItem from "./NotificationItem";
import * as S from "./NotificationList.Style";
const { ListWrap, ListInner, Empty } = S;

export default function NotificationList({ notifications = [], onMarkRead }) {
  if (!notifications || notifications.length === 0) {
    return (
      <ListWrap>
        <ListInner>
          <Empty>알림이 없습니다.</Empty>
        </ListInner>
      </ListWrap>
    );
  }

  return (
    <ListWrap>
      <ListInner>
        {notifications.map((n) => (
          <NotificationItem key={n.id} item={n} onMarkRead={onMarkRead} />
        ))}
      </ListInner>
    </ListWrap>
  );
}
