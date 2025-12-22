import styled from "styled-components";

export const Container = styled.div`
  padding: 4vh 4vw;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 3vh;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2vh;
`;

export const Title = styled.h1`
  font-size: 4vh;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const SearchWrapper = styled.div`
  width: 40vw;
`;

export const Table = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 2.5vh;
  box-shadow: 0 1vh 3vh rgba(0, 0, 0, 0.08);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.8);
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 2fr 2fr;
  padding: 2.5vh 2.5vw;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-weight: 700;
  color: white;
  font-size: 2vh;
`;

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 2fr 2fr;
  padding: 2.5vh 2.5vw;
  border-bottom: 0.1vh solid #e9ecef;
  align-items: center;
  transition: all 0.3s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: rgba(102, 126, 234, 0.05);
    transform: translateX(0.5vw);
  }
`;

export const PostImage = styled.div`
  width: 9vh;
  height: 9vh;
  border-radius: 1.5vh;
  background-image: url(${props => props.$src});
  background-size: cover;
  background-position: center;
  box-shadow: 0 0.5vh 1.5vh rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

export const ButtonWrapper = styled.div`
  width: 10vw;
`;
