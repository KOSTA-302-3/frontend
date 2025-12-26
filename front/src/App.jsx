import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { increaseUnreadCount } from "./store/slices/notificationSlice";
import { fetchMyInfo } from "./store/thunks/authThunks";
const wsNotificationIp = import.meta.env.VITE_WS_NOTIFICATION_IP || "";

function App() {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.userId);

  const protocol = window.location.protocol === "https:" ? "wss" : "ws";

  useEffect(() => {
    dispatch(fetchMyInfo());
  }, [dispatch]);

  useEffect(() => {
    if (userId == null) return;
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
  }, [dispatch, userId]);

  return <Outlet />;
}

export default App;
