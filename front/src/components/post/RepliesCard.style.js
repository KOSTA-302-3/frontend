import styled from "styled-components";

export const Card = styled.div`
  width: 95%;
  background: black;
  overflow: hidden;
  margin-top: 1vh;
  border-top: 1px solid #e6c0c7;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 1vh 1vw;
  gap: 1vw;
  background: black;
  border-top: transparent;
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
  color: #e6c0c7;
`;

export const Content = styled.div`
  padding: 0 1vw 1vh;
  color: #e6c0c7;
  background: black;
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
