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
        onTitle={() => nav("/")}
        onNotification={() => nav("/notifications")}
        onMessage={() => nav("/chat")}
      />
      <Outlet />
      <BottomNav
        onHome={() => nav("/")}
        onSearch={() => console.log("검색")}
        onAdd={() => nav("posts")}
        onProfile={() => nav("/mypage")}
        onSetting={() => nav("/settings")}
      />
    </Wrapper>
  );
}
