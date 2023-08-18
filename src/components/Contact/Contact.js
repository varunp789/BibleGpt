import React from "react";
import { Button, Form, Input, InputNumber } from "antd";
import "./Contact.css";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const onFinish = (values) => {
  console.log(values);
};

const App = () => (
  <div className="contact-main">
    <div className="contact">
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        //   className="contact-main"
        style={{ maxWidth: 600 }}
        validateMessages={validateMessages}>
        <Form.Item
          name={["user", "name"]}
          label="Name"
          rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "email"]}
          label="Email"
          rules={[{ type: "email", required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "age"]}
          label="Age"
          rules={[{ type: "number", min: 0, max: 99 ,required: true}]}>
          <InputNumber />
        </Form.Item>
        <Form.Item
          name={["user", "Message"]}
          label="Message"
          rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  </div>
);

export default App;
