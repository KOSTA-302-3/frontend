import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const Sidebar = styled.div`
  width: 20vw;
  background: #2c3e50;
  color: white;
  padding: 3vh 0;
`;

export const Logo = styled.div`
  padding: 2vh 2vw;
  font-size: 2.5vh;
  font-weight: bold;
  border-bottom: 0.1vh solid rgba(255, 255, 255, 0.1);
  margin-bottom: 2vh;
`;

export const MenuItem = styled.div`
  padding: 2vh 2vw;
  display: flex;
  align-items: center;
  gap: 1vw;
  cursor: pointer;
  font-size: 1.8vh;
  transition: all 0.3s;
  background: ${props => props.$active ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  border-left: 0.3vw solid ${props => props.$active ? '#e6c0c7' : 'transparent'};

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  .anticon {
    font-size: 2.5vh;
  }
`;

export const Content = styled.div`
  flex: 1;
  background: #f5f5f5;
  overflow-y: auto;
`;
