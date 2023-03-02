import React from "react";

import { Link } from "react-router-dom";
import { Layout, Button, Row, Col, Typography, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAction } from "../redux/actions";

const { Title, Text } = Typography;
const { Header, Content } = Layout;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginLoading = useSelector((state) => state.login.loading);

  const onFinish = (values) => {
    dispatch(loginAction(navigate, values));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Layout>
        <Header style={{ background: "#fff" }}></Header>
        <Content style={{ margin: "60px" }}>
          <Row style={{ textAlign: "center" }}>
            <Col
              xs={{ span: 24, offset: 0 }}
              lg={{ span: 6, offset: 9 }}
              md={{ span: 12 }}
            >
              <Title className="mb-15">Login</Title>
              <Title level={5}>Enter your email and password to sign in</Title>
              <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                className="row-col"
              >
                <Form.Item
                  label="Email"
                  name="email"
                  type="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  type="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={loginLoading}
                  >
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
          <Row style={{ textAlign: "center" }}>
            <Col
              xs={{ span: 24, offset: 0 }}
              lg={{ span: 6, offset: 9 }}
              md={{ span: 12 }}
            >
              <Text>Don't have an account? </Text>
              <Link variant="subtitle2" to="/register">
                Register Now
              </Link>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};

export default Login;
