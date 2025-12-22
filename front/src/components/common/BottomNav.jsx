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

export default function BottomNav({
  onHome,
  onSearch,
  onAdd,
  onProfile,
  onSetting,
}) {
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
          <ProfileImage src="https://i.namu.wiki/i/TUPFV3G5bPhTqh4VvoRYnmkRxa3SoPGPUTzQZt-er6orxSIDgJi_CTbMAFBXyZWw6xJyTOLkbjmL6YpMhFkj-Q.webp" />
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
