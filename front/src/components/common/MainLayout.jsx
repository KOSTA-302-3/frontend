import styled from "styled-components";
import TopNav from "./TopNav";
import BottomNav from "./BottomNav";

const Wrapper = styled.div`
  padding-top: 12%;
  padding-bottom: 10%;  
  min-height: 100vh;
  background: #130016;   
  color: #fff;
`;

export default function MainLayout({ children }) {
  return (
    <Wrapper>
      <TopNav 
        title="SANTA" 
        onNotification={() => console.log('알림')}
        onMessage={() => console.log('메시지')}
      />
      {children}
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
