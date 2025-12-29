import styled from "styled-components";
import { Card } from "antd";

export const Container = styled.div`
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
  background: #f5f5f5;
  min-height: calc(100vh - 60px);
`;

export const Header = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

export const Title = styled.h2`
  margin: 0 0 8px 0;
  font-size: 28px;
  font-weight: bold;
  color: #333;
`;

export const Subtitle = styled.p`
  margin: 0;
  font-size: 14px;
  color: #666;
`;

export const BadgeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
`;

export const BadgeCard = styled(Card)`
  cursor: default;
  transition: all 0.3s;
  border-radius: 12px;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  .ant-card-body {
    padding: 20px;
    text-align: center;
    background: white;
  }
`;

export const BadgeImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin-bottom: 12px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
`;

export const BadgeName = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 8px;
  color: #333;
`;

export const BadgeDescription = styled.div`
  font-size: 13px;
  color: #888;
  line-height: 1.4;
`;

export const BadgePrice = styled.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
  font-size: 14px;
  color: #1890ff;
  font-weight: 600;
`;
