import styled from "styled-components";

export const Card = styled.div`
  width: 95%;
  background: white;
  overflow: hidden;
  margin-top: 1vh;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 1vh 1vw;
  gap: 1vw;
`;

export const ProfileImageWrapper = styled.div`
  width: 3vh;
  height: 3vh;
`;

export const Username = styled.div`
  color: black;
  font-size: 2vh;
  font-weight: bold;
  flex: 1;
`;

export const Content = styled.div`
  padding: 0 1vw 1vh;
  color: black;
`;

export const LikesCount = styled.div`
  font-size: 1.5vh;
  font-weight: bold;
  margin-bottom: 1vh;
`;

export const Caption = styled.div`
  font-size: 2vh;
  line-height: 1.5;
  .username {
    font-weight: bold;
    margin-right: 1vw;
  }
`;
