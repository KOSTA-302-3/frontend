import { addChatMember, removeChatMember, setOnline } from "../store/slices/chatMembersSlice";
import { addMessage, updateUnreadCount } from "../store/slices/messagesSlice";
const chatIp = import.meta.env.VITE_WS_CHAT_IP || "";

let socket = null;

export function connectChatSocket({ roomId, dispatch, onOpen }) {
  return new Promise((resolve, reject) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      resolve();
      return;
    }
    console.log("Connecting to chat WS...");
    //ws, wss 구별하기
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";

    // WebSocket 연결 생성
    socket = new WebSocket(`${protocol}${chatIp}${roomId}`);

    // WebSocket 이벤트 핸들러 설정
    socket.onopen = async () => {
      console.log("WS connected");

      try {
        if (onOpen) {
          await onOpen();
        }
        resolve();
      } catch (e) {
        reject(e);
      }
    };

    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      // 서버에서 온 메시지를 Redux로 흘림
      if (msg.messageType === "STATUS") {
        dispatch(setOnline({ id: msg.userId, online: msg.online }));
        if (msg.lastRead !== undefined && msg.lastRead !== null) {
          dispatch(updateUnreadCount({ lastRead: msg.lastRead }));
        }
        return;
      }
      if (msg.messageType === "MEMBER_IN") {
        dispatch(addChatMember(msg.chatroomMemberDTO));
        return;
      }
      if (msg.messageType === "MEMBER_OUT") {
        dispatch(removeChatMember(msg.userId));
        return;
      }
      dispatch(addMessage(msg));
    };

    socket.onclose = () => {
      console.log("WS disconnected");
      socket = null;
    };
    socket.onerror = (err) => {
      console.error("WS error", err);
      socket.close();
    };
  });
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
