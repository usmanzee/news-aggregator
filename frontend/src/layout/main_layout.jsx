import React from "react";
import { Layout, Avatar, Col, Row, Menu, Dropdown, Space } from "antd";
import { LogoutOutlined, UserOutlined, DownOutlined } from "@ant-design/icons";
import logo from "../../src/assets/logo.svg";
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../redux/actions";
import { useDispatch } from "react-redux";

const { Header, Content } = Layout;
const MainLayout = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loggedIn } = props;

  const menu = (
    <Menu>
      <Menu.Item
        key="1"
        icon={<LogoutOutlined style={{ fontSize: "14px" }} />}
        onClick={() => {
          dispatch(logoutAction(navigate));
        }}
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    // <Layout>
    //   <Header>
    //     <Row className="" gutter={16}>
    //       <Col className="text-left" span={22}>
    //         <a href="/" className="logo">
    //           <img width={"100px"} src={logo} alt="" />
    //         </a>
    //       </Col>
    //       {loggedIn === true ? (
    //         <Col className="text-right" span={2}>
    //           <Dropdown overlay={menu}>
    //             <div>
    //               <Avatar icon={<UserOutlined />} />
    //               <DownOutlined style={{ marginLeft: "4px", fontSize: "14" }} />
    //             </div>
    //           </Dropdown>
    //         </Col>
    //       ) : (
    //         <Col className="text-right" span={8}>
    //           <Link to="/login">Login</Link>
    //         </Col>
    //       )}
    //     </Row>
    //   </Header>
    //   <Content className="content">
    //     <Outlet />
    //   </Content>
    // </Layout>

    <Layout>
      <Header className="header">
        <Row justify="space-between" className="header-menu">
          <Space>
            <Col>
              <a href="/" className="logo">
                <img width={"100px"} src={logo} alt="" />
              </a>
            </Col>
          </Space>
          <Col>
            {loggedIn === true ? (
              <Dropdown overlay={menu}>
                <Row>
                  <Col>
                    <Avatar icon={<UserOutlined />} />
                  </Col>
                  <Col>
                    <DownOutlined
                      style={{ marginLeft: "4px", fontSize: "14" }}
                    />
                  </Col>
                </Row>
              </Dropdown>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </Col>
        </Row>
      </Header>
      <Content className="content">
        <Outlet />
      </Content>
    </Layout>
  );
};

export default MainLayout;
