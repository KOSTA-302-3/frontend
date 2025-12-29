import { useEffect, useState } from "react";
import { message, Empty, Spin } from "antd";
import axiosInstance from "../../api/axiosInstance";
import {
  Container,
  Header,
  Title,
  Subtitle,
  BadgeGrid,
  BadgeCard,
  BadgeImage,
  BadgeName,
  BadgeDescription,
  BadgePrice,
} from "./BadgeSettings.styled";

function BadgeSettings() {
  const [myBadges, setMyBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyBadges();
  }, []);

  const fetchMyBadges = async () => {
    try {
      const response = await axiosInstance.get("/api/custom/my-badges/0");
      setMyBadges(response.data.content || []);
    } catch (error) {
      console.error("뱃지 목록 조회 실패:", error);
      message.error("뱃지 목록을 불러올 수 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  const changeBadge = (id, name) => {
    if (!confirm(name + "(으)로 뱃지를 바꾸시겠습니까?")) return;
    axiosInstance({
      url: `/api/user/custom/BADGE/${id}`,
      method: "PUT",
    })
      .then(() => {
        alert("뱃지 변경 완료!");
      })
      .catch(() => {
        alert("뱃지 변경을 실패했습니다.");
      });
  }

  if (loading) {
    return (
      <Container>
        <Spin size="large" style={{ display: "block", margin: "100px auto" }} />
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>내 뱃지 컬렉션</Title>
        <Subtitle>구매한 뱃지 {myBadges.length}개</Subtitle>
      </Header>

      {myBadges.length === 0 ? (
        <Empty 
          description="보유한 뱃지가 없습니다. 뱃지샵에서 구매해보세요!" 
          style={{ 
            background: 'white', 
            padding: '60px 20px', 
            borderRadius: '12px' 
          }}
        />
      ) : (
        <BadgeGrid>
          {myBadges.map((badge) => (
            <BadgeCard key={badge.badgeId} onClick={() => changeBadge(badge.badgeId, badge.name)}>
              <BadgeImage src={badge.imageUrl} alt={badge.name} />
              <BadgeName>{badge.name}</BadgeName>
              <BadgeDescription>{badge.description}</BadgeDescription>
              <BadgePrice>{badge.price?.toLocaleString()} P</BadgePrice>
            </BadgeCard>
          ))}
        </BadgeGrid>
      )}
    </Container>
  );
}

export default BadgeSettings;
