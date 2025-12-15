import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./components/common/MainLayout";
import BottomNav from "./components/common/BottomNav";
import TestPage from "./pages/TestPage";
import SearchPage from "./pages/common/SearchPage";
import PostView from "./pages/post/PostView";
import Login from "./pages/common/login";

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
                onHome={() => console.log("홈")}
                onSearch={() => console.log("검색")}
                onAdd={() => console.log("추가")}
                onProfile={() => console.log("프로필")}
                onSetting={() => console.log("설정")}
              />
            </>
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
        <Route
          path="/dd"
          element={
            <MainLayout current="home">
              <PostView />
            </MainLayout>
          }
        />

        <Route
          path="/login"
          element={
            <MainLayout current="home">
              <Login />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
