// SignUpLayout.jsx
import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { LayoutWrapper, Card, Title } from "./SignUp.styles";
import { StyledTitle } from "../../components/common/LoginForm.style";

export const SignUpContext = createContext();

function SignUpPage() {
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
    profileImage: "",
    description: "",
    level: 10,
  });

  return (
    <SignUpContext.Provider value={{ newUser, setNewUser }}>
      <LayoutWrapper>
        <Card>
          <StyledTitle>SIGN UP</StyledTitle>
          <Outlet />
        </Card>
      </LayoutWrapper>
    </SignUpContext.Provider>
  );
}

export default SignUpPage;
