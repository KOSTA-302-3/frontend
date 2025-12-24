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

    socket.onmessage = () => {
      console.log("Notification WS message received");
      // payload 안 보고 숫자만 증가
      dispatch(increaseUnreadCount());
    };

    socket.onerror = (e) => {
      console.error("WebSocket error", e);
    };

    return () => {
      socket.close();
    };
  }, [dispatch]);

  return <Outlet />;
}

export default App;
