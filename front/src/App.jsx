import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./components/common/MainLayout";
import BottomNav from "./components/common/BottomNav";
import TestPage from "./pages/TestPage";
import TestPage2 from "./pages/TestPage2";
import SearchPage from "./pages/common/SearchPage";
import ProfilePage from "./pages/user/ProfilePage"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* SearchPage - BottomNav만 사용 */}
        <Route
          path="/search"
          element={
            <>
              <SearchPage />
              <BottomNav 
                onHome={() => console.log('홈')}
                onSearch={() => console.log('검색')}
                onAdd={() => console.log('추가')}
                onProfile={() => console.log('프로필')}
                onSetting={() => console.log('설정')}
              />
            </>
          }
        />

        {/* ProfilePage - 커스텀 헤더 + BottomNav */}
        <Route
          path="/profile"
          element={
            <>
              <ProfilePage 
                username="EAST__SEA"
                displayName="최동해"
                profileImage="https://via.placeholder.com/150"
                bio="동해조아"
                posts={15}
                followers="7k"
                following={3}
              />
              <BottomNav 
                onHome={() => console.log('홈')}
                onSearch={() => console.log('검색')}
                onAdd={() => console.log('추가')}
                onProfile={() => console.log('프로필')}
                onSetting={() => console.log('설정')}
              />
            </>
          }
        />
        
        {/* TestPage2 - 버튼 테스트 */}
        <Route
          path="/test2"
          element={
            <MainLayout current="home">
              <TestPage2 />
            </MainLayout>
          }
        />
        
        {/* 다른 페이지들 MainLayout 사용 */}
        <Route
          path="/"
          element={
            <MainLayout current="home">
              <TestPage />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
