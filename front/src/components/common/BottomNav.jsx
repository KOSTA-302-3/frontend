import {
  HomeOutlined,
  SettingOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import ProfileImage from "./ProfileImage";
import person_basic from "../../assets/person_basic.png";
import {
  Bar,
  NavItem,
  ProfileItem,
  ProfileImageWrapper,
} from "./BottomNav.styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import person_basic from "../../assets/person_basic.png";

export default function BottomNav({
  onHome,
  onSearch,
  onAdd,
  onProfile,
  onSetting,
}) {
  perso;
  const user = useSelector((state) => state.auth.user);
  const nav = useNavigate();

  return (
    <Bar>
      <NavItem onClick={onHome}>
        <HomeOutlined />홈
      </NavItem>

      <NavItem onClick={() => nav("search")}>
        <SearchOutlined />
        검색
      </NavItem>

      <NavItem onClick={onAdd}>
        <PlusCircleOutlined />
        추가
      </NavItem>

      <ProfileItem onClick={onProfile}>
        <ProfileImageWrapper>
          <ProfileImage
            src={user?.profileImage ? user?.profileImage : person_basic}
          />
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
