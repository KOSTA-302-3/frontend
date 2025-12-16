import styled from "styled-components";
import LoginForm from "../../components/common/LoginForm";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30h;
  padding: 3vh 3vw;
  margin-top: 20vh;
  margin-left: 5%;
  color: #e6c0c7;
`;

const Login = () => {
  return (
    <Container>
      <LoginForm />
    </Container>
  );
};

export default Login;
