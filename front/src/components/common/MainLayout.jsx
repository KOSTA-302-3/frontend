import { Outlet, useNavigate } from "react-router-dom";
import TopNav from "./TopNav";
import BottomNav from "./BottomNav";
import { Wrapper } from "./MainLayout.styles";

export default function MainLayout() {
  const nav = useNavigate();

  return (
    <Wrapper>
      <TopNav title="SANTA" onNotification={() => console.log("알림")} onMessage={() => nav("/chat")} />
      <Outlet />
      <BottomNav
        onHome={() => console.log("홈")}
        onSearch={() => nav("/search")}
        onAdd={() => console.log("추가")}
        onProfile={() => nav("/user/1")}
        onSetting={() => console.log("설정")}
      />
    </Wrapper>
  );
}
