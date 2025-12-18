import { addMessage } from "../store/slices/messagesSlice";

let socket = null;

export function connectChatSocket({ roomId, token, dispatch }) {
  if (socket) return;

  socket = new WebSocket(`wss://example.com/chat/${roomId}?token=${token}`);

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
