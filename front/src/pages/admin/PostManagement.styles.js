import styled from "styled-components";

export const Container = styled.div`
  padding: 3vh 3vw;
  display: flex;
  flex-direction: column;
  gap: 3vh;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 3vh;
  font-weight: bold;
  color: #333;
`;

export const SearchWrapper = styled.div`
  width: 40vw;
`;

export const Table = styled.div`
  background: white;
  border-radius: 2vh;
  box-shadow: 0 0.2vh 1vh rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 2fr 2fr;
  padding: 2vh 2vw;
  background: #f5f5f5;
  font-weight: bold;
  color: #333;
  font-size: 1.8vh;
`;

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 2fr 2fr;
  padding: 2vh 2vw;
  border-bottom: 0.1vh solid #f0f0f0;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #fafafa;
  }
`;

export const PostImage = styled.div`
  width: 8vh;
  height: 8vh;
  border-radius: 1vh;
  background-image: url(${props => props.$src});
  background-size: cover;
  background-position: center;
`;

export const ButtonWrapper = styled.div`
  width: 10vw;
`;
