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
  flex-wrap: wrap;
  gap: 2vh;
`;

export const Title = styled.h1`
  font-size: 4vh;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: flex;
  align-items: center;
  gap: 1vw;
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5vw;
`;

export const SearchInput = styled.input`
  padding: 1.2vh 2vw;
  border-radius: 2vh;
  border: 1px solid #e0e0e0;
  outline: none;
  font-size: 1.8vh;
  width: 25vw;
  transition: all 0.2s;
  background-color: white;

  &:focus {
    border-color: #4A90E2;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

export const AddButton = styled.button`
  padding: 1.2vh 2.5vw;
  border-radius: 2vh;
  border: none;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 1.8vh;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 0.8vw;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const BadgeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2.5vh;
  margin-top: 2vh;
`;

export const BadgeCard = styled.div`
  background: white;
  border-radius: 2vh;
  padding: 2.5vh;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  gap: 1.5vh;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`;

export const BadgeImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  border-radius: 50%;
  background-color: #f9f9f9;
  border: 2px solid #e0e0e0;
  margin: 0 auto;
  padding: 10px;
`;

export const BadgeInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vh;
  flex: 1;
`;

export const BadgeName = styled.h3`
  font-size: 2.2vh;
  font-weight: 700;
  color: #333;
  margin: 0;
`;

export const BadgeDescription = styled.p`
  font-size: 1.6vh;
  color: #666;
  margin: 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const BadgePrice = styled.div`
  font-size: 2vh;
  font-weight: 700;
  color: #667eea;
  margin-top: auto;
  padding-top: 1vh;
  border-top: 1px solid #f0f0f0;
`;

export const BadgeActions = styled.div`
  display: flex;
  gap: 1vw;
  margin-top: 1vh;
`;

export const ActionButton = styled.button`
  flex: 1;
  padding: 1vh 0;
  border-radius: 1vh;
  border: none;
  font-size: 1.6vh;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5vw;

  ${props => props.type === 'edit' && `
    background-color: #4A90E2;
    color: white;

    &:hover {
      background-color: #357ABD;
    }
  `}

  ${props => props.type === 'delete' && `
    background-color: #ff4d4f;
    color: white;

    &:hover {
      background-color: #d9363e;
    }
  `}

  &:active {
    transform: scale(0.98);
  }
`;

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 6vh 0;
  font-size: 2.2vh;
  color: #666;
  background: white;
  border-radius: 2vh;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

export const EmptyMessage = styled.div`
  text-align: center;
  padding: 8vh 0;
  font-size: 2.2vh;
  color: #999;
  background: white;
  border-radius: 2vh;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;
