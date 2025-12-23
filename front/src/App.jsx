import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { increaseUnreadCount } from "./store/slices/notificationSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const socket = new WebSocket("ws://192.168.0.19:8080/ws/notification");

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
