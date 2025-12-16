import { Outlet } from "react-router-dom";
import TopNav from "./TopNav";
import BottomNav from "./BottomNav";
import { Wrapper } from "./MainLayout.styles";

export default function MainLayout() {
  return (
    <Wrapper>
      <TopNav 
        title="SANTA" 
        onNotification={() => console.log('알림')}
        onMessage={() => console.log('메시지')}
      />
      <Outlet />
      <BottomNav 
        onHome={() => console.log('홈')}
        onSearch={() => console.log('검색')}
        onAdd={() => console.log('추가')}
        onProfile={() => console.log('프로필')}
        onSetting={() => console.log('설정')}
      />
    </Wrapper>
  );
}
