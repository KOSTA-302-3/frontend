import { addMessage } from "../store/slices/messagesSlice";

let socket = null;

export function connectChatSocket({ roomId, dispatch }) {
  if (socket) return;

  //ws, wss 구별하기
  const protocol = window.location.protocol === "https:" ? "wss" : "ws";

  // WebSocket 연결 생성
  socket = new WebSocket(`${protocol}://example.com/chat/${roomId}`);

  // WebSocket 이벤트 핸들러 설정
  socket.onopen = () => {
    console.log("WS connected");
  };

  socket.onmessage = (event) => {
    const msg = JSON.parse(event.data);

    // 서버에서 온 메시지를 Redux로 흘림
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
