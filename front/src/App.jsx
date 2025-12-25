import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { increaseUnreadCount } from "./store/slices/notificationSlice";
const wsNotificationIp = import.meta.env.VITE_WS_NOTIFICATION_IP || "";

function App() {
  const dispatch = useDispatch();

  const protocol = window.location.protocol === "https:" ? "wss" : "ws";

  const isLogin = useSelector((state) => state.auth.isLogin);

  useEffect(() => {
    if (!isLogin) return;
    const socket = new WebSocket(`${protocol}${wsNotificationIp}`);
    socket.onopen = () => {
      console.log("Notification WS connected");
    };
    socket.onmessage = (event) => {
      console.log("Notification WS message received");
      const msg = event.data;
      console.log("Notification WS message content:", msg);
      if (msg === "Notification") {
        dispatch(increaseUnreadCount());
      }
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
  }, [dispatch, isLogin]);

  return <Outlet />;
}

export default App;
