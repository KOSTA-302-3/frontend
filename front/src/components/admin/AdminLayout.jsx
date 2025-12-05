import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DashboardOutlined, UserOutlined, FileTextOutlined, WarningOutlined } from "@ant-design/icons";

const Container = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Sidebar = styled.div`
  width: 20vw;
  background: #2c3e50;
  color: white;
  padding: 3vh 0;
`;

const Logo = styled.div`
  padding: 2vh 2vw;
  font-size: 2.5vh;
  font-weight: bold;
  border-bottom: 0.1vh solid rgba(255, 255, 255, 0.1);
  margin-bottom: 2vh;
`;

const MenuItem = styled.div`
  padding: 2vh 2vw;
  display: flex;
  align-items: center;
  gap: 1vw;
  cursor: pointer;
  font-size: 1.8vh;
  transition: all 0.3s;
  background: ${props => props.$active ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  border-left: 0.3vw solid ${props => props.$active ? '#e6c0c7' : 'transparent'};

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  .anticon {
    font-size: 2.5vh;
  }
`;

const Content = styled.div`
  flex: 1;
  background: #f5f5f5;
  overflow-y: auto;
`;

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const menuItems = [
    { key: 'dashboard', icon: <DashboardOutlined />, label: '대시보드', path: '/admin' },
    { key: 'users', icon: <UserOutlined />, label: '사용자 관리', path: '/admin/users' },
    { key: 'posts', icon: <FileTextOutlined />, label: '게시물 관리', path: '/admin/posts' },
    { key: 'reports', icon: <WarningOutlined />, label: '신고 관리', path: '/admin/reports' },
  ];

  const handleMenuClick = (key, path) => {
    setActiveMenu(key);
    navigate(path);
  };

  return (
    <Container>
      <Sidebar>
        <Logo>SANTA</Logo>
        {menuItems.map(item => (
          <MenuItem
            key={item.key}
            $active={activeMenu === item.key}
            onClick={() => handleMenuClick(item.key, item.path)}
          >
            {item.icon}
            <span>{item.label}</span>
          </MenuItem>
        ))}
      </Sidebar>
      <Content>
        {children}
      </Content>
    </Container>
  );
};

export default AdminLayout;
