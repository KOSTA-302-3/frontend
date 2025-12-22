import styled from "styled-components";

export const Card = styled.div`
  width: 100%;
  background: #1a001f;
  border-radius: 2vh;
  overflow: hidden;
  margin-bottom: 3vh;
  margin-top: 1.5vh;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 2vh 3vw;
  gap: 2vw;
`;

export const ProfileImageWrapper = styled.div`
  width: 5vh;
  height: 5vh;
`;

export const Username = styled.div`
  color: #e6c0c7;
  font-size: 2vh;
  font-weight: bold;
  flex: 1;
`;

export const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 1;
`;

export const Actions = styled.div`
  display: flex;
  gap: 3vw;
  padding: 2vh 3vw;
`;

export const Content = styled.div`
  padding: 0 3vw 2vh;
  color: #e6c0c7;
`;

export const LikesCount = styled.div`
  font-size: 1.8vh;
  font-weight: bold;
  margin-bottom: 1vh;
`;

export const Caption = styled.div`
  font-size: 1.8vh;
  line-height: 1.5;

  .username {
    font-weight: bold;
    margin-right: 1vw;
  }
`;
