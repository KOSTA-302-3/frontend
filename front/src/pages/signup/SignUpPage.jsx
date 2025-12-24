// SignUpLayout.jsx
import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { LayoutWrapper, Card, Title } from "./SignUp.styles";

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
          <Title>SIGN UP</Title>
          <Outlet />
        </Card>
      </LayoutWrapper>
    </SignUpContext.Provider>
  );
}

export default SignUpPage;
