import { Outlet, useNavigate } from "react-router-dom";
import TopNav from "./TopNav";
import BottomNav from "./BottomNav";
import { Wrapper } from "./MainLayout.styles";

export default function MainLayout() {
  const nav = useNavigate();

  return (
    <Wrapper>
      <TopNav title="SANTA" onNotification={() => nav("/notifications")} onMessage={() => nav("/chat")} />
      <Outlet />
      <BottomNav
        onHome={() => console.log("홈")}
        onSearch={() => console.log("검색")}
        onAdd={() => nav("posts")}
        onProfile={() => console.log("프로필")}
        onSetting={() => console.log("설정")}
      />
    </Wrapper>
  );
}
