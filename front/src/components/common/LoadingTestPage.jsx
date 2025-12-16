import React, { useState } from "react";
import styled from "styled-components";
import Loading from "../../components/common/Loading";
import AppButton from "../../components/common/AppButton";

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

const TestBox = styled.div`
  position: relative;
  padding: 3vh 2vw;
  background: #000000a0;
  border-radius: 1vh;
  min-height: 20vh;
  display: flex;
  flex-direction: column;
  gap: 2vh;
  align-items: center;
  justify-content: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 2vw;
  flex-wrap: wrap;
`;

const ButtonWrapper = styled.div`
  width: 20vw;
  height: 5vh;
`;

const LoadingTestPage = () => {
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [showInline, setShowInline] = useState(false);

  const handleFullScreenTest = () => {
    setShowFullScreen(true);
    setTimeout(() => setShowFullScreen(false), 3000);
  };

  const handleInlineTest = () => {
    setShowInline(true);
    setTimeout(() => setShowInline(false), 3000);
  };

  return (
    <Container>
      <Title>로딩 컴포넌트 테스트</Title>

      <Section>
        <h3>크기별 로딩</h3>
        <TestBox>
          <div style={{ display: "flex", gap: "5vw", alignItems: "center" }}>
            <div>
              <p style={{ textAlign: "center", marginBottom: "1vh" }}>Small</p>
              <Loading size="small" />
            </div>
            <div>
              <p style={{ textAlign: "center", marginBottom: "1vh" }}>Medium</p>
              <Loading size="medium" />
            </div>
            <div>
              <p style={{ textAlign: "center", marginBottom: "1vh" }}>Large</p>
              <Loading size="large" />
            </div>
          </div>
        </TestBox>
      </Section>

      <Section>
        <h3>인라인 로딩 테스트</h3>
        <TestBox>
          <ButtonGroup>
            <ButtonWrapper>
              <AppButton onClick={handleInlineTest}>
                인라인 로딩 시작
              </AppButton>
            </ButtonWrapper>
          </ButtonGroup>
          {showInline && <Loading />}
          {showInline && <p>3초 후 자동으로 사라집니다...</p>}
        </TestBox>
      </Section>

      <Section>
        <h3>전체 화면 로딩 테스트</h3>
        <TestBox>
          <ButtonGroup>
            <ButtonWrapper>
              <AppButton onClick={handleFullScreenTest}>
                전체 화면 로딩 시작
              </AppButton>
            </ButtonWrapper>
          </ButtonGroup>
          <p>버튼을 누르면 3초간 전체 화면 로딩이 표시됩니다</p>
        </TestBox>
      </Section>
      {showFullScreen && <Loading fullScreen />}
    </Container>
  );
};

export default LoadingTestPage;
