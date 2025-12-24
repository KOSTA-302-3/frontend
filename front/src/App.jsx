import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { increaseUnreadCount } from "./store/slices/notificationSlice";
const wsNotificationIp = import.meta.env.VITE_WS_NOTIFICATION_IP || "";

function App() {
  const dispatch = useDispatch();

  const protocol = window.location.protocol === "https:" ? "wss" : "ws";

  useEffect(() => {
    const socket = new WebSocket(`${protocol}${wsNotificationIp}`);
    socket.onopen = () => {
      console.log("Notification WS connected");
    };
    socket.onmessage = () => {
      console.log("Notification WS message received");
      // payload 안 보고 숫자만 증가
      dispatch(increaseUnreadCount());
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
  }, [dispatch]);

  return <Outlet />;
}

export default App;
