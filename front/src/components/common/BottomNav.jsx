import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import ProfileImage from "./ProfileImage";
import "./BottomNav.css";

export default function BottomNav({ onHome, onSearch, onAdd, onProfile, onSetting }) {
  return (
    <div className="bottom-nav">
      <div className="nav-item" onClick={onHome}>
        <HomeOutlined />
        홈
      </div>

      <div className="nav-item" onClick={onSearch}>
        <SearchOutlined />
        검색
      </div>

      <div className="nav-item" onClick={onAdd}>
        <PlusCircleOutlined />
        추가
      </div>

      <div className="profile-item" onClick={onProfile}>
        <div className="profile-image-wrapper">
          <ProfileImage src="https://via.placeholder.com/150" />
        </div>
        프로필
      </div>

      <div className="nav-item" onClick={onSetting}>
        <SettingOutlined />
        설정
      </div>
    </div>
  );
}
