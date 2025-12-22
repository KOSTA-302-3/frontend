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
  margin-bottom: 2vh;
`;

export const Title = styled.h1`
  font-size: 3vh;
  font-weight: bold;
  color: #333;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2vw;
`;

export const StatCard = styled.div`
  background: white;
  padding: 3vh 2vw;
  border-radius: 2vh;
  box-shadow: 0 0.2vh 1vh rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1vh;
`;

export const StatIcon = styled.div`
  font-size: 4vh;
  color: ${props => props.$color || '#e6c0c7'};
`;

export const StatValue = styled.div`
  font-size: 3.5vh;
  font-weight: bold;
  color: #333;
`;

export const StatLabel = styled.div`
  font-size: 1.8vh;
  color: #666;
`;
