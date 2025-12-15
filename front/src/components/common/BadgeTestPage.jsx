import React from "react";
import styled from "styled-components";
import Badge from "../../components/common/Badge";

const Container = styled.div`
  padding: 3vh 3vw;
  display: flex;
  flex-direction: column;
  gap: 3vh;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5vh;
`;

const Title = styled.h2`
  font-size: 2.5vh;
  color: #333;
`;

const TestItem = styled.div`
  display: flex;
  align-items: center;
  gap: 2vw;
  padding: 2vh 2vw;
  background: #000000;
  border-radius: 1vh;
`;

const UserBox = styled.div`
  display: flex;
  align-items: center;
  padding: 1vh 2vw;
  background: white;
  border-radius: 0.5vh;
  font-size: 2vh;
  color: #333;
`;

const Description = styled.span`
  font-size: 1.8vh;
  color: #666;
`;

const BadgeTestPage = () => {
  // 임시 테스트용 이미지
  const testBadges = {
    blue: "https://cdn-icons-png.flaticon.com/512/7595/7595571.png",
    gold: "https://cdn-icons-png.flaticon.com/512/744/744984.png",
    silver: "https://cdn-icons-png.flaticon.com/512/744/744956.png",
    crown: "https://cdn-icons-png.flaticon.com/512/3176/3176366.png",
    star: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
  };

  return (
    <Container>
      <Title>뱃지 테스트</Title>

      <Section>
        <h3>체크 뱃지</h3>
        <TestItem>
          <UserBox>
            Kun_Woo
            <Badge imageUrl={testBadges.blue} />
          </UserBox>
          <Description>체크 뱃지</Description>
        </TestItem>
      </Section>

      <Section>
        <h3>골드 뱃지</h3>
        <TestItem>
          <UserBox>
            East_Sea
            <Badge imageUrl={testBadges.gold} />
          </UserBox>
          <Description>골드 트로피 뱃지</Description>
        </TestItem>
      </Section>

      <Section>
        <h3>실버 뱃지</h3>
        <TestItem>
          <UserBox>
            Stone_Dragon
            <Badge imageUrl={testBadges.silver} />
          </UserBox>
          <Description>뱃지</Description>
        </TestItem>
      </Section>

      <Section>
        <h3>뱃지</h3>
        <TestItem>
          <UserBox>
            VIP_User
            <Badge imageUrl={testBadges.crown} />
          </UserBox>
          <Description>뱃지2</Description>
        </TestItem>
      </Section>

      <Section>
        <h3>스타 뱃지</h3>
        <TestItem>
          <UserBox>
            Star_User
            <Badge imageUrl={testBadges.star} />
          </UserBox>
          <Description>스타 뱃지</Description>
        </TestItem>
      </Section>


      <Section>
        <h3>여러 뱃지 조합</h3>
        <TestItem>
          <UserBox>
            Super_User
            <Badge imageUrl={testBadges.blue} />
            <Badge imageUrl={testBadges.crown} />
            <Badge imageUrl={testBadges.star} />
          </UserBox>
          <Description>다중 뱃지</Description>
        </TestItem>
      </Section>
    </Container>
  );
};

export default BadgeTestPage;
