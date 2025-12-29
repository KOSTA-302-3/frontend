import {
  HomeOutlined,
  SettingOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import ProfileImage from "./ProfileImage";
import {
  Bar,
  NavItem,
  ProfileItem,
  ProfileImageWrapper,
} from "./BottomNav.styles";
import { useDispatch, useSelector } from "react-redux";

export default function BottomNav({
  onHome,
  onSearch,
  onAdd,
  onProfile,
  onSetting,
}) {
  const user = useSelector((state) => state.auth.user);

  return (
    <Bar>
      <NavItem onClick={onHome}>
        <HomeOutlined />홈
      </NavItem>

      <NavItem onClick={onSearch}>
        <SearchOutlined />
        검색
      </NavItem>

      <NavItem onClick={onAdd}>
        <PlusCircleOutlined />
        추가
      </NavItem>

      <ProfileItem onClick={onProfile}>
        <ProfileImageWrapper>
          <ProfileImage src={user?.profileImage} />
        </ProfileImageWrapper>
        프로필
      </ProfileItem>

      <NavItem onClick={onSetting}>
        <SettingOutlined />
        설정
      </NavItem>
    </Bar>
  );
}
