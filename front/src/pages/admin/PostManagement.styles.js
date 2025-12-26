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
  grid-template-columns: 2fr 4fr 1.5fr;
  padding: 2.5vh 2.5vw;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-weight: 700;
  color: white;
  font-size: 2vh;
`;

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 4fr 1.5fr;
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

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2vw;
  margin-top: 3vh;
  font-size: 2vh;
  font-weight: 600;
  color: #495057;
`;

export const PageButton = styled.button`
  padding: 1vh 2vw;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 1vh;
  font-size: 1.8vh;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0.5vh 1.5vh rgba(102, 126, 234, 0.3);

  &:hover:not(:disabled) {
    transform: translateY(-0.3vh);
    box-shadow: 0 0.8vh 2vh rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    background: linear-gradient(135deg, #dee2e6 0%, #adb5bd 100%);
    cursor: not-allowed;
    box-shadow: none;
  }
`;
