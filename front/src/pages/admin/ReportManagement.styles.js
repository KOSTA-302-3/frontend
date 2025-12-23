import styled from "styled-components";

export const Container = styled.div`
  padding: 4vh 4vw;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 3vh;
`;

export const Title = styled.h1`
  font-size: 4vh;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
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
  grid-template-columns: 1fr 1fr 1fr 2fr 1.5fr 2fr;
  padding: 2.5vh 2.5vw;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-weight: 700;
  color: white;
  font-size: 2vh;
`;

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 2fr 1.5fr 2fr;
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

export const StatusBadge = styled.span`
  padding: 0.8vh 1.5vw;
  border-radius: 1.5vh;
  font-size: 1.6vh;
  font-weight: 600;
  box-shadow: 0 0.3vh 0.8vh rgba(0, 0, 0, 0.1);
  background: ${props => {
    if (props.$status === "pending") return 'linear-gradient(135deg, #fff7e6 0%, #ffe7ba 100%)';
    if (props.$status === "approved") return 'linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)';
    return 'linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%)';
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

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const TypeSelect = styled.select`
  padding: 10px 16px;
  border-radius: 20px;
  border: 1px solid #e0e0e0;
  outline: none;
  font-size: 14px;
  background-color: white;
  cursor: pointer;
  transition: border-color 0.2s;

  &:focus {
    border-color: #4A90E2;
  }
`;

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #666;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2vw;
  margin-top: 3vh;
  padding: 2vh 0;
`;

export const PaginationButton = styled.button`
  padding: 1.2vh 2.5vw;
  border-radius: 1.5vh;
  font-size: 1.8vh;
  font-weight: 600;
  border: none;
  background: ${props => props.disabled 
    ? 'linear-gradient(135deg, #d3d3d3 0%, #a9a9a9 100%)' 
    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  color: white;
  box-shadow: ${props => props.disabled 
    ? '0 0.3vh 0.8vh rgba(0, 0, 0, 0.1)' 
    : '0 0.5vh 1.5vh rgba(102, 126, 234, 0.4)'};
  transition: all 0.3s ease;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  min-width: 8vw;

  &:hover {
    background: ${props => props.disabled 
      ? 'linear-gradient(135deg, #d3d3d3 0%, #a9a9a9 100%)' 
      : 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)'};
    transform: ${props => props.disabled ? 'none' : 'translateY(-0.3vh)'};
    box-shadow: ${props => props.disabled 
      ? '0 0.3vh 0.8vh rgba(0, 0, 0, 0.1)' 
      : '0 0.8vh 2vh rgba(102, 126, 234, 0.5)'};
  }
`;

export const PageInfo = styled.span`
  padding: 1.2vh 2.5vw;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 1.5vh;
  color: #667eea;
  font-size: 2vh;
  font-weight: 700;
  box-shadow: 0 0.5vh 1.5vh rgba(102, 126, 234, 0.2);
  min-width: 10vw;
  text-align: center;
`;
