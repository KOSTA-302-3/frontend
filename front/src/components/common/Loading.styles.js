import styled, { keyframes, css } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  ${props => props.$fullScreen && css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    //background: rgba(255, 255, 255, 0.9);
    z-index: 9999;
  `}
  
  ${props => !props.$fullScreen && css`
    width: 100%;
    padding: 5vh 0;
  `}
`;

export const Spinner = styled.div`
  border: 0.5vh solid #f3f3f3;
  border-top: 0.5vh solid #da3d5aff;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  
  ${props => props.$size === 'small' && css`
    width: 3vh;
    height: 3vh;
    border-width: 0.3vh;
  `}
  
  ${props => props.$size === 'medium' && css`
    width: 5vh;
    height: 5vh;
    border-width: 0.4vh;
  `}
  
  ${props => props.$size === 'large' && css`
    width: 8vh;
    height: 8vh;
    border-width: 0.5vh;
  `}
`;
