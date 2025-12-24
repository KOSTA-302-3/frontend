import { useState, useEffect } from "react";
import { ShoppingOutlined, WalletOutlined } from "@ant-design/icons";
import { Modal, message } from "antd";
import axiosInstance from "../../api/axiosInstance";
import SearchBar from "../../components/common/SearchBar";
import AppButton from "../../components/common/AppButton";
import { 
  Container, 
  Header, 
  Title, 
  PointDisplay,
  PointAmount,
  SearchBarWrapper,
  BadgeGrid,
  BadgeCard,
  BadgeImageWrapper,
  BadgeImage,
  BadgeInfo,
  BadgeName,
  BadgeDescription,
  BadgePrice,
  EmptyMessage,
  LoadingMessage
} from "./BadgeShop.styles";

const BadgeShop = () => {
  const [badges, setBadges] = useState([]);
  const [userPoint, setUserPoint] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // 현재 유저 정보 불러오기 (포인트 확인)
  const fetchUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/api/user/me");
      setUserPoint(response.data.point || 0);
    } catch (error) {
      console.error("유저 정보 조회 실패:", error);
      message.error("유저 정보를 불러오는데 실패했습니다.");
    }
  };

  // 뱃지 목록 불러오기
  const fetchBadges = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/custom/badge/0");
      setBadges(response.data.content || []);
    } catch (error) {
      console.error("뱃지 목록 조회 실패:", error);
      message.error("뱃지 목록을 불러오는데 실패했습니다.");
      setBadges([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
    fetchBadges();
  }, []);

  // 검색 필터링
  const filteredBadges = badges.filter(badge => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      badge.name?.toLowerCase().includes(term) ||
      badge.description?.toLowerCase().includes(term)
    );
  });

  // 뱃지 구매
  const handleBuyBadge = async (badge) => {
    if (userPoint < badge.price) {
      message.warning("포인트가 부족합니다!");
      return;
    }

    Modal.confirm({
      title: '뱃지 구매',
      content: (
        <div>
          <p><strong>{badge.name}</strong>을(를) 구매하시겠습니까?</p>
          <p>가격: <span style={{ color: '#e91e63', fontWeight: 'bold' }}>{badge.price.toLocaleString()}</span> 포인트</p>
          <p>구매 후 잔액: <span style={{ color: '#e91e63', fontWeight: 'bold' }}>{(userPoint - badge.price).toLocaleString()}</span> 포인트</p>
        </div>
      ),
      okText: '구매',
      cancelText: '취소',
      onOk: async () => {
        try {
          await axiosInstance.post('/api/custom/badge', badge.badgeId, {
            headers: { 'Content-Type': 'application/json' }
          });
          message.success(`${badge.name} 뱃지를 구매했습니다!`);
          // 포인트 갱신
          await fetchUserInfo();
        } catch (error) {
          console.error("뱃지 구매 실패:", error);
          if (error.response?.status === 400) {
            message.error("이미 보유한 뱃지이거나 구매할 수 없습니다.");
          } else {
            message.error("뱃지 구매에 실패했습니다.");
          }
        }
      }
    });
  };

  return (
    <Container>
      <Header>
        <Title>
          뱃지 상점
        </Title>
        <PointDisplay>
          <WalletOutlined />
          <span>보유 포인트:</span>
          <PointAmount>{userPoint.toLocaleString()}</PointAmount>
        </PointDisplay>
      </Header>

      <SearchBarWrapper>
        <SearchBar 
          placeholder="뱃지 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchBarWrapper>

      {loading ? (
        <LoadingMessage>로딩 중...</LoadingMessage>
      ) : filteredBadges.length === 0 ? (
        <EmptyMessage>
          {searchTerm ? "검색 결과가 없습니다." : "등록된 뱃지가 없습니다."}
        </EmptyMessage>
      ) : (
        <BadgeGrid>
          {filteredBadges.map((badge) => {
            const canAfford = userPoint >= badge.price;
            return (
              <BadgeCard key={badge.badgeId}>
                <BadgeImageWrapper>
                  <BadgeImage 
                    src={badge.imageUrl || "https://placehold.co/150x150?text=No+Image"} 
                    alt={badge.name || '뱁지'}
                    onError={(e) => {
                      e.target.src = "https://placehold.co/150x150?text=No+Image";
                    }}
                  />
                </BadgeImageWrapper>
                <BadgeInfo>
                  <BadgeName>{badge.name}</BadgeName>
                  <BadgeDescription>{badge.description}</BadgeDescription>
                  <BadgePrice>
                    {badge.price ? badge.price.toLocaleString() : '0'} 포인트
                  </BadgePrice>
                </BadgeInfo>
                <AppButton
                  disabled={!canAfford}
                  onClick={() => handleBuyBadge(badge)}
                  style={{
                    background: canAfford ? '#e91e63' : 'rgba(255, 255, 255, 0.1)',
                    borderColor: canAfford ? '#e91e63' : 'rgba(255, 255, 255, 0.2)',
                    color: canAfford ? 'white' : 'rgba(255, 255, 255, 0.4)',
                    cursor: canAfford ? 'pointer' : 'not-allowed',
                  }}
                >
                  {canAfford ? '구매하기' : '포인트 부족'}
                </AppButton>
              </BadgeCard>
            );
          })}
        </BadgeGrid>
      )}
    </Container>
  );
};

export default BadgeShop;
