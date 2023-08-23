import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [addLoginemail, setaddLoginEmail] = useState("");
  const [addLoginpassword, setAddLoginPassword] = useState("");
  const navigate = useNavigate();

  // User Login info
  const handleSubmit = async () => {
    const API = `${process.env.REACT_APP_URL}/admin/login`;
    const reqData = {
      method: "POST",
      body: JSON.stringify({
        email: addLoginemail,
        password: addLoginpassword,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    };

    try {
      const res = await fetch(API, reqData);
      const messages = await res.text();
      console.log(messages);
      if (res.ok) {
        toast.success("Login successful");
        localStorage.setItem("isLogging", true);
        navigate("/admin");
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      console.error("failed to Login");
      toast.warning("failed to login");
    }
    setaddLoginEmail("");
    setAddLoginPassword("");
  };

  return (
    <div className="login-main">
      <h1>Admin Login</h1>

      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}>
        <Form.Item
          name="Email"
          rules={[{ required: true, message: "Please input your Username!" }]}>
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
            value={addLoginemail}
            onChange={(e) => setaddLoginEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}>
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            value={addLoginpassword}
            onChange={(e) => setAddLoginPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="/*">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button">
            Log in
          </Button>
          Or <a href="/register">Register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default App;
