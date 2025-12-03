import styled from "styled-components";
import AppButton from "../components/common/AppButton";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5vh;
  padding: 3vh 3vw;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vh;
`;

const Title = styled.div`
  color: #e6c0c7;
  font-size: 2.5vh;
  font-weight: bold;
`;

const ButtonWrapper = styled.div`
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '6vh'};
`;

const Row = styled.div`
  display: flex;
  gap: 2vw;
`;

export default function TestPage2() {
  return (
    <Container>
      <Section>
        <Title>로그인 / 회원가입 버튼</Title>
        <ButtonWrapper width="80vw" height="6vh">
          <AppButton onClick={() => console.log('로그인')}>로그인</AppButton>
        </ButtonWrapper>
        <ButtonWrapper width="80vw" height="6vh">
          <AppButton onClick={() => console.log('회원가입')}>회원가입</AppButton>
        </ButtonWrapper>
      </Section>

      <Section>
        <Title>팔로우 버튼 (작은 크기)</Title>
        <Row>
          <ButtonWrapper width="40vw" height="4vh">
            <AppButton onClick={() => console.log('팔로우')}>팔로우</AppButton>
          </ButtonWrapper>
          <ButtonWrapper width="40vw" height="4vh">
            <AppButton onClick={() => console.log('언팔로우')}>언팔로우</AppButton>
          </ButtonWrapper>
        </Row>
      </Section>

      <Section>
        <Title>확인 / 취소 버튼</Title>
        <Row>
          <ButtonWrapper width="35vw" height="5vh">
            <AppButton onClick={() => console.log('확인')}>확인</AppButton>
          </ButtonWrapper>
          <ButtonWrapper width="35vw" height="5vh">
            <AppButton onClick={() => console.log('취소')}>취소</AppButton>
          </ButtonWrapper>
        </Row>
      </Section>

      <Section>
        <Title>게시글 작성 버튼</Title>
        <ButtonWrapper width="90vw" height="7vh">
          <AppButton onClick={() => console.log('게시하기')}>게시하기</AppButton>
        </ButtonWrapper>
      </Section>

      <Section>
        <Title>비활성화 버튼</Title>
        <ButtonWrapper width="80vw" height="6vh">
          <AppButton disabled>전송 중...</AppButton>
        </ButtonWrapper>
      </Section>

      <Section>
        <Title>로딩 버튼</Title>
        <ButtonWrapper width="80vw" height="6vh">
          <AppButton loading>처리 중</AppButton>
        </ButtonWrapper>
      </Section>
    </Container>
  );
}
