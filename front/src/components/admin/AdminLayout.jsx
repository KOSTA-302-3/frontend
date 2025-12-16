import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { DashboardOutlined, UserOutlined, FileTextOutlined, WarningOutlined } from "@ant-design/icons";
import { Container, Sidebar, Logo, MenuItem, Content } from "./AdminLayout.styles";

const AdminLayout = () => {
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
        <Logo>SANTA ADMIN</Logo>
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
        <Outlet />
      </Content>
    </Container>
  );
};

export default AdminLayout;
