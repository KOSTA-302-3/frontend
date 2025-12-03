import styled from "styled-components";
import { MenuOutlined } from "@ant-design/icons";
import ProfileImage from "../../components/common/ProfileImage";
import AppButton from "../../components/common/AppButton";
import ImageCard from "../../components/common/ImageCard";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #130016;
  overflow-y: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3vh 5vw;
  height: 10vh;
`;

const Username = styled.div`
  color: #e6c0c7;
  font-size: 3vh;
  font-weight: bold;
`;

const MenuIcon = styled(MenuOutlined)`
  font-size: 3vh;
  color: #e6c0c7;
  cursor: pointer;
`;

const ProfileSection = styled.div`
  padding: 0 5vw 3vh;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 5vw;
  margin-bottom: 3vh;
`;

const ProfileImageWrapper = styled.div`
  width: 12vh;
  height: 12vh;
  flex-shrink: 0;
  overflow: hidden;
  position: relative;
`;

const Stats = styled.div`
  display: flex;
  gap: 5vw;
  flex: 1;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #e6c0c7;
`;

const StatNumber = styled.div`
  font-size: 2.5vh;
  font-weight: bold;
`;

const StatLabel = styled.div`
  font-size: 1.8vh;
  margin-top: 0.5vh;
`;

const ProfileInfo = styled.div`
  color: #e6c0c7;
  margin-bottom: 2vh;
`;

const DisplayName = styled.div`
  font-size: 2vh;
  font-weight: bold;
  margin-bottom: 1vh;
`;

const Bio = styled.div`
  font-size: 1.8vh;
  line-height: 1.5;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 2vw;
`;

const ButtonWrapper = styled.div`
  flex: 1;
  height: 5vh;
`;

const DateSection = styled.div`
  padding: 2vh 5vw;
  color: #e6c0c7;
  font-size: 1.8vh;
`;

const GridSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5vw;
  padding: 0 0 12vh 0;
`;

const ProfilePage = ({ 
  username = "user_name",
  displayName = "사용자 이름",
  profileImage = "https://via.placeholder.com/150",
  bio = "",
  posts = 0,
  followers = 0,
  following = 0
}) => {
  return (
    <>
      <Wrapper>
        <Header>
          <Username>{username}</Username>
          <MenuIcon onClick={() => console.log('메뉴')} />
        </Header>

        <ProfileSection>
          <ProfileHeader>
            <ProfileImageWrapper>
              <ProfileImage src={profileImage} />
            </ProfileImageWrapper>

            <Stats>
              <StatItem>
                <StatNumber>{posts}</StatNumber>
                <StatLabel>게시물</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>{followers}</StatNumber>
                <StatLabel>팔로워</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>{following}</StatNumber>
                <StatLabel>팔로잉</StatLabel>
              </StatItem>
            </Stats>
          </ProfileHeader>

          <ProfileInfo>
            <DisplayName>{displayName}</DisplayName>
            <Bio>{bio}</Bio>
          </ProfileInfo>

          <ButtonRow>
            <ButtonWrapper>
              <AppButton onClick={() => console.log('프로필 편집')}>
                프로필 편집
              </AppButton>
            </ButtonWrapper>
            <ButtonWrapper>
              <AppButton onClick={() => console.log('프로필 공유')}>
                프로필 공유
              </AppButton>
            </ButtonWrapper>
          </ButtonRow>
        </ProfileSection>

        <DateSection>2025 · 11 · 31</DateSection>

        <GridSection>
          {Array.from({ length: 9 }).map((_, index) => (
            <ImageCard
              key={index}
              image="https://via.placeholder.com/300"
              onClick={() => console.log(`게시글 ${index + 1}`)}
            />
          ))}
        </GridSection>
      </Wrapper>
    </>
  );
};

export default ProfilePage;
