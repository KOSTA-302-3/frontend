import styled from "styled-components";
import { ArrowLeftOutlined } from "@ant-design/icons";
import SearchBar from "../../components/common/SearchBar";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #1a001f;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  position: relative;
`;

const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 12vh;
  background: #1a001f;
  display: flex;
  align-items: center;
  padding: 0 4vw;
  gap: 3vw;
  box-sizing: border-box;
  z-index: 100;
`;

const BackButton = styled(ArrowLeftOutlined)`
  font-size: 3.5vh;
  color: #e6c0c7;
  cursor: pointer;
`;

const SearchBarWrapper = styled.div`
  flex: 1;
  height: 5vh;
`;

const Content = styled.div`
  margin-top: 10vh;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  width: 100%;
  padding-bottom: 10vh;
`;

const ImageCard = styled.div`
  aspect-ratio: 1;
  background: ${(props) => props.$color || '#2d1a33'};
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

export default function SearchPage({ onBack }) {
  const colors = [
    '#8B7355', '#9FA8B8', '#D4A574', '#E8B88E', '#6B7A8F',
    '#4A4A4A', '#C5A572', '#B8A88A', '#D4A76A', '#7A6F5D',
    '#A89968', '#8B8B8B', '#6B8E7A', '#9B8B6F', '#7A8B9B'
  ];

  return (
    <Wrapper>
      <Header>
        <BackButton onClick={onBack} />
        <SearchBarWrapper>
          <SearchBar />
        </SearchBarWrapper>
      </Header>
      
      <Content>
        {colors.map((color, index) => (
          <ImageCard key={index} $color={color} />
        ))}
      </Content>
    </Wrapper>
  );
}
