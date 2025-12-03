import styled from "styled-components";

export const Bar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 10%;
  background: #0f0013;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-top: 0.1vh solid #522959;
  box-sizing: border-box;
`;

export const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: clamp(10px, 1.5vh, 14px);
  color: #e6c0c7;
  cursor: pointer;
  flex: 1;

  svg {
    font-size: clamp(20px, 3.5vh, 30px);
    margin-bottom: 1vh;
  }
`;

export const ProfileItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: clamp(10px, 1.5vh, 14px);
  color: #e6c0c7;
  cursor: pointer;
  flex: 1;
`;

export const ProfileImageWrapper = styled.div`
  width: clamp(25px, 4.5vh, 40px);
  height: clamp(25px, 4.5vh, 40px);
  margin-bottom: 1vh;
`;
