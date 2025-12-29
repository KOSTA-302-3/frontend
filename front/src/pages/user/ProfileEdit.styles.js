import styled from "styled-components";

export const ProfileImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5vw;
  gap: 2.0vw;
`;

export const ProfileCircle = styled.div`
  width: 25vw;
  height: 25vw;
  border-radius: 50%;
  background-color: white;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const ChangeImageText = styled.div`
  font-size: 3.0vw;
  color: #e6c0c7;
  cursor: pointer;
  font-weight: 500;
  margin-bottom: 3.0vw;

  &:hover {
    color: #d4a5ad;
    text-decoration: underline;
  }
`;