import styled from "styled-components";

export const Container = styled.div`
  padding: 4vh 4vw;
  background: #130016;
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
  color: #fff;
  display: flex;
  align-items: center;
  gap: 1vw;
`;

export const PointDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 1vw;
  padding: 1.5vh 2.5vw;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2vh;
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 2vh;
  font-weight: 600;
  color: #fff;

  svg {
    font-size: 2.5vh;
    color: #e91e63;
  }
`;

export const PointAmount = styled.span`
  color: #e91e63;
  font-size: 2.4vh;
  font-weight: 800;
`;

export const SearchBarWrapper = styled.div`
  max-width: 500px;
  width: 100%;
`;

export const BadgeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2.5vh;
  margin-top: 2vh;
`;

export const BadgeCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 2vh;
  padding: 2.5vh;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  gap: 1.5vh;

  &:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(233, 30, 99, 0.5);
    box-shadow: 0 8px 24px rgba(233, 30, 99, 0.3);
  }
`;

export const BadgeImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2vh 0;
`;

export const BadgeImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 3px solid #e91e63;
  padding: 12px;
  transition: all 0.3s;

  ${BadgeCard}:hover & {
    transform: scale(1.1) rotate(5deg);
    box-shadow: 0 8px 16px rgba(233, 30, 99, 0.5);
  }
`;

export const BadgeInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vh;
  flex: 1;
  text-align: center;
`;

export const BadgeName = styled.h3`
  font-size: 2.2vh;
  font-weight: 700;
  color: #fff;
  margin: 0;
`;

export const BadgeDescription = styled.p`
  font-size: 1.6vh;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 7.2vh;
`;

export const BadgePrice = styled.div`
  font-size: 2.2vh;
  font-weight: 800;
  color: #e91e63;
  margin-top: auto;
  padding-top: 1.5vh;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 6vh 0;
  font-size: 2.2vh;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 600;
`;

export const EmptyMessage = styled.div`
  text-align: center;
  padding: 6vh 0;
  font-size: 2.2vh;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 600;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 2vh;
`;