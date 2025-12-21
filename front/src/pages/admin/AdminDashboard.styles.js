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
  margin-bottom: 3vh;
`;

export const Title = styled.h1`
  font-size: 4vh;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5vw;
`;

export const StatCard = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  padding: 3.5vh 2.5vw;
  border-radius: 2.5vh;
  box-shadow: 0 1vh 3vh rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1.5vh;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.8);
  animation: slideUp 0.6s ease-out backwards;
  
  &:nth-child(1) {
    animation-delay: 0.1s;
  }
  
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  
  &:nth-child(3) {
    animation-delay: 0.3s;
  }
  
  &:hover {
    transform: translateY(-1vh) scale(1.03);
    box-shadow: 0 2vh 5vh rgba(102, 126, 234, 0.25);
  }
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(3vh);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const StatIcon = styled.div`
  font-size: 5vh;
  color: ${props => props.$color || '#e6c0c7'};
  background: ${props => props.$color ? `${props.$color}15` : '#e6c0c715'};
  width: 7vh;
  height: 7vh;
  border-radius: 1.5vh;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: bounce 2s ease-in-out infinite;
  
  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-0.5vh);
    }
  }
`;

export const StatValue = styled.div`
  font-size: 4vh;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const StatLabel = styled.div`
  font-size: 2vh;
  color: #6c757d;
  font-weight: 500;
`;

export const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.5vw;
  margin-top: 2vh;
`;

export const ChartCard = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  padding: 4vh 3vw;
  border-radius: 2.5vh;
  box-shadow: 0 1vh 3vh rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.8);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: fadeIn 0.8s ease-out backwards;
  
  &:nth-child(1) {
    animation-delay: 0.4s;
  }
  
  &:nth-child(2) {
    animation-delay: 0.5s;
  }
  
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 2vh 5vh rgba(102, 126, 234, 0.2);
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export const ChartTitle = styled.h3`
  font-size: 2.5vh;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 3vh;
  padding-bottom: 1.5vh;
  border-bottom: 2px solid #e9ecef;
`;

export const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  font-size: 2.5vh;
  color: #6c757d;
  font-weight: 500;
`;
