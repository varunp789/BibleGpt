import React, { useState } from "react";
import "./Register.css";
import { Button, Form, Input } from "antd";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { register } from "../constants/Constant";

const App = () => {
  const [addUsername, setAddusername] = useState("");
  const [addPassword, setAddpassword] = useState("");
  const [addEmail, setAddemail] = useState("");
  const [addCheckPassword, setAddcheckpassword] = useState("");
  const navigate = useNavigate()

  /// FOR ADMIN REGISTRATION

  const onFinish = async (values) => {
    const API = `${process.env.REACT_APP_URL}/admin/register`;
    const reqData = {
      method: "POST",
      body: JSON.stringify({
        username: addUsername,
        email: addEmail,
        password: addPassword,
        checkpassword: addCheckPassword,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    };
    try {
      const response = await fetch(API, reqData);
      const message = await response.text();
      toast.success(message);
      navigate("/login")
    } catch (error) {
      console.error("Failed to Register");
    }
    setAddusername("");
    setAddemail("");
    setAddpassword("");
    setAddcheckpassword("");
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    toast.error(`${register.finisherror}`)
  };

  return (
    <div className="register-main">
      <h1>Register</h1>
      <div className="register-form">
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: `${register.usermessage}`,
              },
            ]}>
            <Input
              value={addUsername}
              onChange={(e) => setAddusername(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name={"Email"}
            label="Email"
            rules={[
              {
                type: "email",
                required: true,
                message: `${register.emailmessage}`,
              },
            ]}>
            <Input
              value={addEmail}
              onChange={(e) => setAddemail(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: `${register.passwordmessage}`,
              },
            ]}>
            <Input.Password
              value={addPassword}
              onChange={(e) => setAddpassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Confirm-Pass"
            name="Confirm-password"
            rules={[
              {
                required: true,
                message: `${register.confirmPasswordMessage}`,
              },
            ]}>
            <Input.Password
              value={addCheckPassword}
              onChange={(e) => setAddcheckpassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="login-form-button">
              Submit
            </Button>
            Or <a href="/login">Login!</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default App;
