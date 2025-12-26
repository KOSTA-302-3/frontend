import { resetChatMembers } from "../store/slices/chatMembersSlice";
import { addMessage, resetMessages } from "../store/slices/messagesSlice";
import { fetchMyInfo, getChatMemberRole } from "../store/thunks/authThunks";
import { fetchChatInit } from "../store/thunks/chatThunks";
const chatIp = import.meta.env.VITE_WS_CHAT_IP || "";

let socket = null;

export function connectChatSocket({ roomId, dispatch, onOpen }) {
  if (socket) return;

  //ws, wss 구별하기
  const protocol = window.location.protocol === "https:" ? "wss" : "ws";

  // WebSocket 연결 생성
  socket = new WebSocket(`${protocol}${chatIp}${roomId}`);

  // WebSocket 이벤트 핸들러 설정
  socket.onopen = () => {
    console.log("WS connected");
    if (onOpen) {
      onOpen();
    }
  };

  socket.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    // 서버에서 온 메시지를 Redux로 흘림
    if (msg.messageType === "STATUS") {
      dispatch(resetMessages());
      dispatch(resetChatMembers());
      dispatch(fetchMyInfo());
      dispatch(getChatMemberRole(roomId));
      dispatch(fetchChatInit(roomId));
    }
    dispatch(addMessage(msg));
  };

  socket.onclose = () => {
    console.log("WS disconnected");
    socket = null;
  };
}

export function disconnectChatSocket() {
  if (socket) {
    socket.close();
    socket = null;
  }
}

export function sendMessageViaSocket(message, type) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    const payload = {
      payload: message,
      type: type,
    };
    socket.send(JSON.stringify(payload));
  } else {
    console.error("WebSocket is not connected.");
  }
}
