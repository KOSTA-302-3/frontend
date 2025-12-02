import styled from "styled-components";
import { LeftOutlined, BellOutlined, MailOutlined } from "@ant-design/icons";

const Wrapper = styled.div`
 position: fixed;
 top: 0;
 left: 0;
 width: 100%;
 height: 12vh;
 background: #1a001f;
 display: flex;
 align-items: center;
 padding-inline : 6vw;
 box-sizing: border-box;
 z-index: 100;
`;

const BackIcon = styled(LeftOutlined)`
  font-size: 4vh;
  font-weight: bold;
  color: #e6c0c7;
  margin : 0;
  cursor: pointer;
`;

const Title = styled.h1`
  font-size: 4vh;
  font-weight: bold;
  color: #e6c0c7;
  margin: 0;
  flex: 1;
  text-align: ${(p) => (p.$hasBack ? "left" : "left")};
`;

const IconGroup = styled.div`
  display: flex;
  gap: 3vw;
  align-items: center;
`;

const HeaderIcon = styled.div`
  font-size: 3.5vh;
  color: #e6c0c7;
  cursor: pointer;
  
  &:hover {
    color: #ffdaec;
  }
`;

export default function TopNav({ title, onBack, onNotification, onMessage }) {
  return (
    <Wrapper>
      {onBack && <BackIcon onClick={onBack} />}
      <Title $hasBack={!!onBack}>{title}</Title>
      <IconGroup>
        {onNotification && (
          <HeaderIcon onClick={onNotification}>
            <BellOutlined />
          </HeaderIcon>
        )}
        {onMessage && (
          <HeaderIcon onClick={onMessage}>
            <MailOutlined />
          </HeaderIcon>
        )}
      </IconGroup>
    </Wrapper>
  );
}
