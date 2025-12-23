import { Outlet, useNavigate } from "react-router-dom";
import TopNav from "./TopNav";
import BottomNav from "./BottomNav";
import { Wrapper } from "./MainLayout.styles";
import { useSelector } from "react-redux";

export default function MainLayout() {
  const nav = useNavigate();
  // const level = useSelector((state) => state.post.level);

  return (
    <Wrapper>
      <TopNav
        title="SANTA"
        onNotification={() => console.log("알림")}
        onMessage={() => nav("/chat")}
      />
      <Outlet />
      <BottomNav
        onHome={() => nav("main")}
        onSearch={() => console.log("검색")}
        onAdd={() => nav("posts")}
        onProfile={() => console.log("프로필")}
        onSetting={() => console.log("설정")}
      />
    </Wrapper>
  );
}
