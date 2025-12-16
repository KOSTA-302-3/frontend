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
  grid-template-columns: 3fr 2fr 2fr 2fr;
  padding: 2vh 2vw;
  background: #f5f5f5;
  font-weight: bold;
  color: #333;
  font-size: 1.8vh;
`;

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr 2fr 2fr;
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

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1vw;
`;

export const Avatar = styled.div`
  width: 4vh;
  height: 4vh;
  border-radius: 50%;
  background: #e6c0c7;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
`;

export const StatusBadge = styled.span`
  padding: 0.5vh 1vw;
  border-radius: 1vh;
  font-size: 1.5vh;
  background: ${props => props.$active ? '#d4edda' : '#f8d7da'};
  color: ${props => props.$active ? '#155724' : '#721c24'};
`;

export const ButtonWrapper = styled.div`
  width: 10vw;
`;
