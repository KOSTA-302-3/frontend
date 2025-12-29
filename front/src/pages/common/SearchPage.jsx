import styled from "styled-components";
import { ArrowLeftOutlined } from "@ant-design/icons";
import SearchBar from "../../components/common/SearchBar";
import SearchGrid from "../../components/common/SearchGrid";
import { useNavigate } from "react-router-dom";

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
  margin-top: 1vh;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  width: 300%;
  padding-bottom: 10vh;
`;

export default function SearchPage() {
  const nav = useNavigate();

  const onBack = () => {
    nav(-1);
  };
  return (
    <Wrapper>
      <Header>
        <BackButton onClick={onBack} />
        <SearchBarWrapper onClick={() => nav("/searchDetail")}>
          <SearchBar />
        </SearchBarWrapper>
      </Header>

      <Content>
        <SearchGrid />
      </Content>
    </Wrapper>
  );
}
