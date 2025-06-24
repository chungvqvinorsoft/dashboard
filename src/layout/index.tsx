import {
  Avatar,
  Breadcrumb,
  Button,
  Drawer,
  Dropdown,
  Layout,
  Menu,
  MenuProps,
  Space,
  Tooltip,
  Typography,
} from "antd";
import styles from "./Layout.module.css";
import classNames from "classnames/bind";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import logo from "../assets/images/logo.png";
import service from "../assets/icons/service.svg";
import logoutIcon from "../assets/icons/logout.svg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Grid } from "antd";
import menu from "../assets/icons/menu.svg";
import { menus } from "./config";
import AntdButtonCustom from "../components/AntdButtonCustom";
const cx = classNames.bind(styles);

interface LayoutPageProps {
  children: React.ReactNode;
}

function LayoutPage({ children }: LayoutPageProps) {
  const navigate = useNavigate();
  const isMobile = Grid.useBreakpoint();
  const [openMenuMb, setOpenMenuMb] = useState(false);
  let checkBreakpoint = (isMobile?.xs || isMobile?.sm) && !isMobile?.md;
  const SideBar = checkBreakpoint ? Header : Sider;

  const handleLogout = () => {
    navigate("/login", { replace: true });
    localStorage.clear();
  };

  useEffect(() => {
    const login = localStorage.getItem("token");
    if (!login) {
      navigate("/login", { replace: true });
    }
  }, []);

  const handleOpenMenu = () => {
    setOpenMenuMb(!openMenuMb);
  };

  const handleClickLogo = () => {
    navigate("/");
  };
  const handleClickMenu: MenuProps["onClick"] = (value) => {};

  const items: MenuProps["items"] = [
    {
      label: (
        <Button type="text" onClick={() => handleLogout()}>
          {/* <Space align="center" size={"small"}> */}
          <img src={logoutIcon} alt="Logout" style={{ height: 20 }} />
          Đăng xuất
          {/* </Space> */}
        </Button>
      ),
      key: "0",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className={cx("header")}>
        <Space className={cx("header-logo")} onClick={handleClickLogo}>
          <img src={logo} className={cx("logo")} />
          Dashboard
        </Space>
        <Space className={cx("avatar")} align="center">
          <Typography.Title level={5} className={cx("name")}>
            {localStorage.getItem("name") || ""}
          </Typography.Title>
          <Dropdown destroyOnHidden menu={{ items }} trigger={["click"]}>
            <Avatar
              src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
              className={cx("avatar-img")}
            />
          </Dropdown>
        </Space>
      </Header>
      {/* Sidebar */}
      <Layout>
        <SideBar width={320} className={cx("sidebar")}>
          {checkBreakpoint ? (
            <>
              <Button
                type="text"
                onClick={handleOpenMenu}
                className={cx("menu-button")}
              >
                <img src={menu} />
              </Button>
              <Drawer onClose={handleOpenMenu} open={openMenuMb}>
                <Menu
                  mode="vertical"
                  className={cx("menu")}
                  onClick={handleClickMenu}
                >
                  {menus?.map((item) => {
                    return (
                      <Menu.Item
                        icon={<img src={item?.icon} />}
                        title={item?.label}
                        className={cx("menu-item")}
                      >
                        <Link to={item?.to}>{item?.label}</Link>{" "}
                      </Menu.Item>
                    );
                  })}
                </Menu>
                <Button
                  className={cx("logout-button-mobile")}
                  onClick={() => handleLogout()}
                >
                  <img src={logoutIcon} alt="Logout" style={{ width: 20 }} />
                  Đăng xuất
                </Button>
              </Drawer>
            </>
          ) : (
            <>
              <Menu
                mode="vertical"
                className={cx("menu")}
                onClick={handleClickMenu}
              >
                {menus?.map((item) => {
                  return (
                    <Menu.Item
                      icon={<img src={item?.icon} />}
                      title={item?.label}
                      className={cx("menu-item")}
                    >
                      <Link to={item?.to}>{item?.label}</Link>{" "}
                    </Menu.Item>
                  );
                })}
              </Menu>
            </>
          )}
        </SideBar>

        <Content className={cx("content")}>{children}</Content>
      </Layout>
    </Layout>
  );
}

export default LayoutPage;
