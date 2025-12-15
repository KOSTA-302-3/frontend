import styled from "styled-components";

export const Container = styled.div`
  padding: 3vh 3vw;
  display: flex;
  flex-direction: column;
  gap: 3vh;
`;

export const Title = styled.h1`
  font-size: 3vh;
  font-weight: bold;
  color: #333;
`;

export const Table = styled.div`
  background: white;
  border-radius: 2vh;
  box-shadow: 0 0.2vh 1vh rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 3fr 2fr 2fr;
  padding: 2vh 2vw;
  background: #f5f5f5;
  font-weight: bold;
  color: #333;
  font-size: 1.8vh;
`;

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 3fr 2fr 2fr;
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

export const StatusBadge = styled.span`
  padding: 0.5vh 1vw;
  border-radius: 1vh;
  font-size: 1.5vh;
  background: ${props => {
    if (props.$status === "pending") return '#fff7e6';
    if (props.$status === "approved") return '#d4edda';
    return '#f8d7da';
  }};
  color: ${props => {
    if (props.$status === "pending") return '#d46b08';
    if (props.$status === "approved") return '#155724';
    return '#721c24';
  }};
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 1vw;
`;

export const ButtonWrapper = styled.div`
  width: 8vw;
`;
